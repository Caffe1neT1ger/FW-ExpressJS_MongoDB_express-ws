class userDto{
    email;
    id;
    ssActivated;
    constructor(model){
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated
    }
}

export default userDto