假设数据库 admin 集合里有三个文档：

```javascript
{ name:'mongo', age: 20},
{ name:'mongo1', age: 30，hobby: ['打篮球'， ‘踢足球’]},
{ name:'mongo2', age: 40，hobby: ['打篮球']},
```

### 查询 find({查询条件}，{输出条件})

1. 关系查询条件： $gt $gte $lt $lte
   ```javascript
   // 查询年龄大于等于20，小于等于60的文档，显示name,不显示description
   db.admin.find({ age: { $gte: 20, $lte: 60 } }, { name: true, description: false });
   ```
2. 判断查询： $or $and $not $all $in

   ```javascript
   // $or: 查询条件或
   db.admin.find({$or: [{age:30 }, {age: 40}])
   ```

   ```javascript
   // $and:查询并且
   db.admin.find({$and: [{age:30 }, {name: 'mongo2'}])
   ```

   ```javascript
   // $not: 查询不满足条件
   db.admin.find({ $not: { age: 30 } });
   ```

   ```javascript
   // $all :查询都满条件
   db.admin.find({hobby: {$all:  ['打篮球'， ‘踢足球’]}})
   ```

   ```javascript
   // $in: 查询只要满足任意一个条件
   db.admin.find({hobby: {$in:  ['打篮球'， ‘踢足球’]}})
   ```

3. 分页查询：limit(每页的条数).skip(间隔).sort(按什么进行升序(1)或者降序(-1)排序)
   ```javascript
   db.admin
     .find({})
     .limit(10)
     .skip(0)
     .sort({ age: -1 | 1 });
   ```

### 数据更新 update()

假设数据库 admin 集合里有一个文档：

```javascript
{ id: 1, name: 'CSDN', description: '技术博客', range:  [ 'web', 'java', 'python' ] }
```

1.  update()：新文档全部替换查询的文档
    ```javascript
    db.admin.update({ id: 1 }, { name: "CADN", description: "技术博客" });
    ```
2.  $set: 修改部分属性的值(修改 name)
    ```javascript
    db.admin.update({ id: 1 }, { $set: { name: "csdn" } });
    ```
3.  $unset：移除部分属性和值(移除 name)
    ```javascript
    db.admin.update({ id: 1 }, { $unset: { name: "" } });
    ```
4.  $push：数据添加值，不检查值是否存在(range:['web','java','python','web'])
    ```javascript
    db.admin.update({ id: 1 }, { $push: { range: "web" } });
    ```
5.  $addToSet：数据添加值, 会检查是否存在(range:['web','java','python'])
    ```javascript
    db.admin.update({ id: 1 }, { $push: { range: "web" } });
    ```
6.  $each：循环
    ```javascript
    var arr = ["游泳", "打篮球", "踢足球"];
    db.admin.update({ id: 1 }, { $addToSet: { hobby: { $each: arr } } });
    ```
7.  upset 属性，有就修改，没有就添加
    ```javascript
    db.admin.update({ id: 1 }, { $set: { hobby: "敲代码" } }, { upset: true });
    ```
8.  mutil 属性; false 单条操作，true:多条操作
    ```javascript
    db.admin.update({}, { $set: { hobby: "敲代码" } }, { mutil: true });
    ```
