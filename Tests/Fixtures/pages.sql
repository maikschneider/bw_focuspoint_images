insert into `pages` (`uid`, `pid`, `title`, `slug`, `sys_language_uid`, `l10n_parent`, `l10n_source`, `perms_userid`,
										 `perms_groupid`, `perms_user`, `perms_group`, `perms_everybody`, `doktype`, `is_siteroot`, `TSconfig`)
values (1, 0, 'Main', '/', 0, 0, 0, 1, 1, 31, 31, 1, 1, 1, 'mod.tx_bwfocuspointimages.settings.fields {
                                                                name {
                                                                    title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.name
                                                                    type = text
                                                                    useAsName = 1
                                                                }

                                                                description {
                                                                    title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.description
                                                                    type = textarea
                                                                }

                                                                color {
                                                                    title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.color
                                                                    type = select
                                                                    options {
                                                                        red = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.color.red
                                                                        green = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.color.green
                                                                        blue = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.color.blue
                                                                    }
                                                                }

                                                                link {
                                                                    title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.link
                                                                    type = link
                                                                }

                                                            }');
