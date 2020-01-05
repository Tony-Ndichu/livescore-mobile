module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'plugin:vue/recommended',
        'airbnb-base'
      ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    parserOptions: {
        parser: 'babel-eslint',
        "ecmaVersion": 6,
      },
};
