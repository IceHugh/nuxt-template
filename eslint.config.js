import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,
  nuxt: true,
  // 禁用格式化相关规则，让 Prettier 处理
  stylistic: false,
  formatters: false,
  // 标准 Nuxt 项目规则配置
  rules: {
    // Vue 相关规则 - 标准配置（禁用格式化相关规则）
    'vue/multi-word-component-names': 'off', // Nuxt 项目通常允许单词组件名
    'vue/no-v-html': 'warn', // v-html 安全警告
    'vue/require-default-prop': 'off', // 不强制 prop 默认值
    'vue/require-prop-types': 'off', // 不强制复杂 prop 类型
    'vue/component-name-in-template-casing': ['warn', 'PascalCase'], // 模板中使用 PascalCase
    'vue/component-definition-name-casing': ['error', 'PascalCase'], // 组件定义使用 PascalCase
    'vue/no-reserved-component-names': 'error', // 不使用保留组件名
    'vue/no-unused-components': 'warn', // 未使用组件警告
    'vue/no-unused-vars': 'warn', // 未使用变量警告
    'vue/custom-event-name-casing': ['error', 'camelCase'], // 自定义事件使用 camelCase
    // 禁用 Vue HTML 格式化相关规则
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-indent': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineProps', 'defineEmits'],
      },
    ],
    'vue/no-undef-properties': 'warn', // 未定义属性警告

    // TypeScript 相关规则 - 标准配置
    'ts/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ], // 忽略 _ 开头的未使用变量
    'ts/no-explicit-any': 'off', // any 类型允许（tRPC 和数据库操作需要）
    'ts/ban-ts-comment': 'warn', // ts 警告注释
    'ts/no-non-null-assertion': 'warn', // 非空断言警告
    'ts/prefer-ts-expect-error': 'error', // 优先使用 @ts-expect-error
    'ts/no-empty-function': 'warn', // 空函数警告
    'ts/explicit-function-return-type': 'off', // 不强制显式返回类型
    'ts/explicit-module-boundary-types': 'off', // 不强制模块边界类型
    'ts/no-inferrable-types': 'off', // 允许可推断类型

    // JavaScript/TypeScript 通用规则 - 标准配置
    'no-console': 'warn', // console 使用警告
    'no-debugger': 'warn', // debugger 警告
    'no-alert': 'warn', // alert 警告
    'node/prefer-global/process': 'off', // 允许使用全局 process
    'no-unused-vars': 'off', // 让 TypeScript 处理
    'no-undef': 'off', // 让 TypeScript 处理
    'prefer-const': 'error', // 优先使用 const
    'no-var': 'error', // 禁止使用 var
    eqeqeq: ['error', 'always'], // 强制使用 ===
    'no-eval': 'error', // 禁止 eval
    'no-implied-eval': 'error', // 禁止隐式 eval
    'no-new-func': 'error', // 禁止 new Function
    'no-script-url': 'error', // 禁止 script URL

    // 代码质量相关
    'no-unreachable': 'error', // 不可达代码
    'no-empty': ['error', { allowEmptyCatch: true }], // 空块
    'no-extra-boolean-cast': 'error', // 额外布尔转换
    'no-regex-spaces': 'error', // 正则表达式空格
    'valid-typeof': 'error', // typeof 检查
    'no-const-assign': 'error', // 常量赋值
    'no-dupe-args': 'error', // 重复参数
    'no-dupe-keys': 'error', // 重复键
    'no-duplicate-case': 'error', // 重复 case

    // 导入相关
    'no-duplicate-imports': 'off', // 允许重复导入（为了更好的类型支持）
    'import/consistent-type-specifier-style': 'off', // 允许内联类型导入
    'perfectionist/sort-named-imports': 'off', // 不强制排序命名导入
    'perfectionist/sort-imports': 'off', // 不强制排序导入
  },

  // 忽略特定文件和目录
  ignores: [
    'node_modules',
    'app/components/ui',
    'components/ui',
    '.nuxt',
    '.wrangler',
    '.output',
    'dist',
    'build',
    'coverage',
    '*.min.js',
    '*.min.css',
    'public',
    '**/*.md',
  ],
})
