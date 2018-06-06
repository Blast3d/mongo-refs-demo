# MongoDB Day 3

## Topics

- exporting data to a JSON file.
- importing data from an exported JSON file.
- modeling one to many relations with true linking.
- data population of one to many relations.
- querying data.
  - sorting.
  - projection.
  - filtering (with and without regex).

### Exporting Data to JSON

Use: `mongoexport --db auth --collection users --out users.json

### Importing Data from an Exported JSON file

Use: `mongoimport --db starwars --collection characters --file characters.json`

### Modeling One to Many Relationships

#### Using Subdocuments (embedded documents)

```js
const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true, unique: true },
  description: { type: String }
});

const RoleModel = mongoose.model('Role', roleSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true },
  roles: [roleSchema],
  claims: [
    { grant: { type: String, required: true, index: true, unique: true } }
  ]
});

const UserModel = mongoose.model('User', userSchema);
```

#### Using Linking (refs)

```js
const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true, unique: true },
});

const RoleModel = mongoose.model('Role', roleSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  claims: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Claim' } },
  ],
});

const UserModel = mongoose.model('User', userSchema);
```

#### Saving refs.

```js
const roleId = '3245sasef34532as353qwef3';
const user = new User({ name: 'John Doe', roles: [] });
user.roles.push(roleId);
user
  .save()
  .then()
  .catch();
```

### Populating Data for One to Many Relationships

```js
User.findById(id)
  .populate('roles')
  .populate('grants');
User.findById(id).populate('roles grants');
User.findById(id)
  .populate('roles', 'name')
  .populate('grants', 'name description');
User.findById(id).populate('roles grants');
```

#### Querying Data

```js
// sorting
let query = User.find().sort('name -age');
let query = User.find().sort({ name: 1, age: -1 });
let query = User.find().sort({ name: 'asc', age: 'desc' });
let query = User.find().sort({ name: 'ascending', age: 'descending' });

// projection
let query = User.find();

query.select('name -age');
query.select({ name: 1, age: 0 });

// filtering
const regex = new RegExp(name, 'i');
query.where({ name: regex });

query.where({ name: { $regex: filter, $options: i } });
query.where('name').regex(/luis/);

query.find({ age: { $gte: 18, $lte: 62 } });
query
  .where('age')
  .gte(18)
  .lte(62);
```
