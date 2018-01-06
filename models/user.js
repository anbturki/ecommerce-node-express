var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {type: String, unique: true, lowercase: true, required: true},
	password: {type: String, required: true},
	profile: {
		name: {type: String, default: ''},
		picture: {type: String, default: ''}
	},

	history: [{
		date: Date,
		paid: {type: Number, default: 0}
	}]
});

UserSchema.pre("save", function (next) {
	var user = this;
	if(!user.isModified('password')) return next();

	bcrypt.genSalt(10, (err, salt) => {
		if(err) return next(err);
		console.log("salted", salt);
		bcrypt.hash(user.password, salt, null, (err, hash) => {
				console.log("hashed", hash);
				user.password = hash;
				next();
			});
	});
});

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);