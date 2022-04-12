class Users{
	constructor() {
		this.users = [];
	}
	addUser(id, name, room){
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}

    removeUser(id){
        var user = this.getUser(id);
        if(user){
           this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser(id){
    	return this.users.filter((user) => user.id === id)[0];
    }

	getUserList(room){
		var roomUsers = this.users.filter((user) => user.room === room);  // returns only particular room users array with all details
		var nameArray = roomUsers.map((user) => user.name);          //returns array of names
		return nameArray;
	}
}

module.exports = {Users};