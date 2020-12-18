module.exports = (mongoose) =>{
    const MovieScema = new mongoose.Schema({
        title: String,
        description: String,
        genre: String,
        release:String,
        rating:[{rating: Number}],
        review: [{text:String, name:String, date:Date}]
    });
    const movieModel = mongoose.model("Movie", MovieScema);

    async function getMovies(){
        try {
            return await movieModel.find();
        } catch(error) {
            console.error("getMovies:", error.message);
            return {};
        }
    }

    async function getMovie(id) {
    try {
      return await movieModel.findById(id);
    } catch (error) {
      console.error("getMovie:", error.message);
      return {};
    }
  }

  async function createReview(text, name, getMovieById){
    const movie = await getMovie(getMovieById);
    const date = Date.now();
    let createNewReview={
      text: text,
      name: name,
      date: date,
    };
    movie.review.push(createNewReview);
    return movie.save()
  };
  
    async function createMovie(title, description, genre, release){
      const createMovie = new movieModel({
        title: title,
        description, description,
        genre, genre,
        release, release,
      })
        return createMovie.save();
    }

    async function createRating(rating, getMovieById){
      const movie = await getMovie(getMovieById);
      let createNewRating={
        rating: rating,
      };
      movie.rating.push(createNewRating);
      return movie.save()
    };

    async function movieTitles() {
        let length = (await getMovies()).length;
        console.log("Movies created:", length);
        if (length === 0) {
          let promises = [];
         {
            let newMovie1 = new movieModel({
                title: `Godfather`,
                description:"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                genre:"Crime, Drama",
                release:"1972",
                });
           
            let newMovie2 = new movieModel({
                title: `The Lord of the Rings: Fellowship of the Ring`,
                description:"A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
                genre:"Action, Adventure, Drama",
                release:"2001"
        });

            let newMovie3 = new movieModel({      
            title: `The Shawshank Redemption`,
            description:"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            genre:"Drama",
            release:"1994"
        });
            let newMovie4 = new movieModel({
            title: `The Great Escape`,
            description:"Allied prisoners of war plan for several hundred of their number to escape from a German camp during World War II",
            genre:'Adventure,Drama',
            release:"1963"
        });
            
            let newMovie5 = new movieModel({
            title: `Die Hard`, 
            description:'An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.',
            genre:"Action",
            release:"1988"
          });

            promises.push(newMovie1.save());
            promises.push(newMovie2.save());
            promises.push(newMovie3.save());
            promises.push(newMovie4.save());
            promises.push(newMovie5.save());

          }
          return Promise.all(promises);
        }
      }

    return{
        createMovie,
        createReview,
        movieTitles,
        getMovie,
        createRating,
        getMovies
    }
}