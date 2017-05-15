module.exports = function(models) {
    const { User, Destination } = models;

    return {
        registerUser(firstName, lastName, username, password) {
            const promise = new Promise((resolve, request) => {
                    Destination.find((error, destinations) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(destinations);
                    });
                })
                .then(destinations => {
                    const user = new User({
                        firstName,
                        lastName,
                        username,
                        password,
                        destinations: destinations
                    });

                    user.destinations.forEach(x => x.isVisited = false);
                    return user;
                })
                .then(user => {
                    return new Promise((resolve, reject) => {
                        user.save((err) => {
                            if (err) {
                                let error;

                                if (err.code === 11000 && err.message.indexOf("username") > 0) {
                                    error = new Error("This username is already in use!");
                                } else {
                                    error = err;
                                }

                                return reject(error);
                            }

                            return resolve(user);
                        });
                    });
                });

            return promise;
        },

        findUserByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne()
                    .byName(username)
                    .exec((err, user) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(user);
                    });
            });
        },

        searchUsers(username) {
            return new Promise((resolve, reject) => {
                User.find()
                    .byName(username)
                    .exec((err, user) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(user);
                    });
            });
        },

        findUserById(userId) {
            return new Promise((resolve, reject) => {
                User.findById(userId).exec((err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getAllUsers() {
            return new Promise((resolve, reject) => {
                User.find(((err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user);
                }));
            });
        },

        visited: []
    };
};