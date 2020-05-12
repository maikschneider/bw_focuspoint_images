module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            options: {
                rootDir: "Resources/Public/JavaScript",
                module: "amd"
            },
            default: {
                watch: "Resources/Private/Typescript",
                src: ["**/*.ts", "!node_modules/**", "!vendor/**"],
                outDir: "Resources/Public/JavaScript",
                tsconfig: true
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts"]);
};
