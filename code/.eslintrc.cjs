module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        './.eslintrc-auto-import.json', // `unplugin-auto-import` 生成的規則設定
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier'
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'vue'],
    rules: {
        '@typescript-eslint/ban-types': [
            'error',
            {
                // 關閉錯誤(error)：不要以 {} 當作一個類型
                extendDefaults: true,
                types: {
                    '{}': false,
                },
            },
        ],
        // "@typescript-eslint/no-explicit-any": ["off"], // 關閉警告(warning)：不允許使用 any
    },
};
