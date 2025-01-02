1. 列出某一个依赖的使用情况

   ```
   npm list [packageName]

   npm list loader-utils
   ```

   如下所示：

   ```txt
   vueProject@1.0.0 /Users/***/Desktop/vueProject
   │ ├─┬ @vue/cli-plugin-babel@5.0.8
   │ ├─┬ babel-loader@8.3.0
   │ │ └── loader-utils@2.0.4  deduped
   │ └─┬ thread-loader@3.0.4
   │   └── loader-utils@2.0.4  deduped
   ├─┬ @vue/cli-service@5.0.8
   │ ├─┬ @vue/vue-loader-v15@npm:vue-loader@15.11.1
   │ │ └── loader-utils@1.4.2
   │ ├─┬ thread-loader@3.0.4
   │ │ └── loader-utils@2.0.4  deduped
   │ └─┬ vue-style-loader@4.1.3
   │   └── loader-utils@1.4.2
   ├─┬ html-webpack-plugin@4.5.2
   │ └── loader-utils@1.4.2
   ├─┬ sass-loader@8.0.2
   │ └── loader-utils@1.4.2
   ├─┬ svg-sprite-loader@6.0.11
   │ ├── loader-utils@1.4.2
   │ └─┬ svg-baker@1.7.0
   │   └── loader-utils@1.4.2
   └─┬ webpack-obfuscator@2.6.0
     └── loader-utils@2.0.4
   ```

2. 查看依赖的所有可用版本

   ```
   npm view [packageName] versions

   npm view loader-utils versions
   ```

   如下所示：

   ```
   [
     '0.1.0',  '0.1.1',  '0.1.2',  '0.2.0',  '0.2.1',
     '0.2.2',  '0.2.3',  '0.2.4',  '0.2.5',  '0.2.6',
     '0.2.7',  '0.2.8',  '0.2.9',  '0.2.10', '0.2.11',
     '0.2.12', '0.2.13', '0.2.14', '0.2.15', '0.2.16',
     '0.2.17', '1.0.0',  '1.0.1',  '1.0.2',  '1.0.3',
     '1.0.4',  '1.1.0',  '1.2.0',  '1.2.1',  '1.2.2',
     '1.2.3',  '1.3.0',  '1.4.0',  '1.4.1',  '1.4.2',
     '2.0.0',  '2.0.1',  '2.0.2',  '2.0.3',  '2.0.4',
     '3.0.0',  '3.1.0',  '3.1.1',  '3.1.2',  '3.1.3',
     '3.2.0',  '3.2.1',  '3.2.2',  '3.3.0',  '3.3.1'
   ]
   ```
