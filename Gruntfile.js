module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            default: {
                tsconfig: {
                    tsconfig: './tsconfig.json',
                    passThrough: true
                },
            },
        },
        move: {
            test: {
                src: './Resources/Private/TypeScript/*.js',
                dest: './Resources/Public/JavaScript/'
            }
        },
        watch: {
            scripts: {
                files: './Resources/Private/TypeScript/*.ts',
                tasks: ['ts', 'move'],
                options: {
                    interrupt: true,
                },
            },
        },
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-move');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["ts", "move"]);
};
