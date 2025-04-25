<?php
namespace Blueways\BwFocuspointImages\Command;

use Blueways\BwFocuspointImages\Utility\HelperUtility;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use TYPO3\CMS\Core\Database\ConnectionPool;

#[AsCommand('focuspoint:schema:repair', 'Repair the sys_file_reference.focus_points column')]
final class FocuspointSchemaRepair extends Command
{
    private const RECT_PROPS = ['x', 'y', 'width', 'height'];

    public function __construct(
        private readonly ConnectionPool $connection
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->setHelp(<<<'TEXT'
        Run this command to migrate the old JSON schema to the new one. It replaces the schema

        {x: ..., y: ...}

        with

        {__shape: "rect", __data: {x: ..., y: ...}}

        for each old rectangular focus point.
        TEXT);
        $this->addOption('dry-run', null, InputOption::VALUE_NEGATABLE, 'Do not perform any actions, but what records will be updated');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $imagesArray = $this->getImages();

        if ($input->getOption('dry-run')) {
            $output->writeln('The next records with the corresponding value of sys_file_reference.uid_local will be updated: ' . join(
                ', ',
                array_map(
                    fn (array $imageMetadata): int => $imageMetadata['uid_local'],
                    $imagesArray
                )
            ));
            return 0;
        }

        foreach ($imagesArray as $imageMetadata) {
            $imageMetadata['focus_points'] = array_map(
                fn (array $focuspoint): array => self::repairSchema($focuspoint, $imageMetadata['width'], $imageMetadata['height']),
                $imageMetadata['focus_points']
            );
            $this->updateRecord($imageMetadata);
        }
        return 0;
    }

    private function updateRecord(array $imageMetadata): void
    {
        $builder = $this->connection->getQueryBuilderForTable('sys_file_reference');
        $builder
            ->update('sys_file_reference')
            ->set('focus_points', json_encode($imageMetadata))
            ->where(
                $builder->expr()->eq(
                    'uid_local',
                    $imageMetadata['uid_local']
                )
            )
            ->executeStatement();
    }

    private function getImages(): array
    {
        $builder = $this->connection->getQueryBuilderForTable('sys_file_reference');
        $imagesArray = $builder
            ->select(
                'sys_file_reference.uid_local',
                'sys_file_reference.focus_points',
                'sys_file_metadata.width',
                'sys_file_metadata.height',
            )
            ->from('sys_file_reference')
            ->leftJoin(
                'sys_file_reference',
                'sys_file_metadata',
                'sys_file_metadata',
                $builder->expr()->eq(
                    'sys_file_reference.uid_local',
                    $builder->quoteIdentifier('sys_file_metadata.file')
                )
            )
            ->where(
                $builder->expr()->isNotNull('sys_file_reference.focus_points'),
                $builder->expr()->neq(
                    'sys_file_reference.focus_points',
                    '""'
                )
            )
            ->executeQuery()->fetchAllAssociative();
        return array_filter(
            array_map(
                fn (array $imageMetadata): array => [
                    ...$imageMetadata,
                    'focus_points' => json_decode($imageMetadata['focus_points'], true)
                ],
                $imagesArray
            ),
            fn (array $imageMetadata): bool => HelperUtility::arraySome($imageMetadata['focus_points'], self::isOldRect(...))
        );
    }

    private static function isOldRect(array $focuspoint): bool
    {
        foreach (self::RECT_PROPS as $prop)
            if (!isset($focuspoint[$prop]) || (!is_float($focuspoint[$prop]) && !is_int($focuspoint[$prop])))
                return false;
        return true;
    }

    private static function repairSchema(array $focuspoint, int $imageWidth, int $imageHeight): array
    {
        if (!self::isOldRect($focuspoint))
            return $focuspoint;
        $focuspoint['__shape'] = 'rect';
        $focuspoint['__data'] = [];
        foreach (self::RECT_PROPS as $prop) {
            $focuspoint['__data'][$prop] = $focuspoint[$prop] * (($prop === 'x' || $prop === 'width') ? $imageWidth : $imageHeight);
            unset($focuspoint[$prop]);
        }
        return $focuspoint;
    }
}
