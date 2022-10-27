
class Post  {
    constructor(post) {
        this.title = post.title;
        this.content = post.content;
        this.imageUrl = post.imageUrl;
        //this.likes = 0;
        //this.dislikes = 0;
        this.dateCreation = new Date();
        this.userId = post.userId;
    }
}

module.exports = Post;