const fs = require("fs");
const express = require("express");
const morgan = require("morgan");


const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
    console.log("hi from the middlewhere")
    next();
})

app.use((req, res, next) => {
    req.Time = new Date;
    next();
})

// 👉 This is how we use get request in our rest api.
// app.get("/", (req, res) => {
//     res.status(200).send("hello from the server side");
// })
// app.get("/", (req, res) => {
//     res.status(200).json({message:"hello from the server side" , app : "Natour"});
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAllTours = (req, res) => {

    console.log(req.Time)

    res.status(200).json({
        status: "success",
        Time : (req.Time),
        result: tours.length,
        data: {
            tours: tours
        }

    })
}


const getTourById = (req, res) => {

    console.log(req.params);

    const id = req.params.id *1;
    const tour = tours.find(el => el.id === id);
    
    if(!tour){
        return res.status(404).json({
            status: "error",
            message: "No tour found"
        })
    }

    res.status(200).json({
        status: "success",
        result: tours.length,
        data: {
              tour
        }

    })
}

const postTour = (req, res) =>{

    // console.log(req.body);
    const NewId = tours[tours.length-1].id + 1;
    console.log(NewId);
    const NewTour = Object.assign({id: NewId}, req.body);

    tours.push(NewTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours`,JSON.stringify(tours),err => {
        console.log("Done");
        res.status(201).json({
            status : "success",
            data : {
                tours:NewTour
            }
        })
    })

    // res.send("Done");
}


const getAllUsers = (req, res) => {
    res.status(500).json({
        success : "success",
        message : "this not defined yet"
    })
}
const postUser = (req, res) => {
    res.status(500).json({
        success : "success",
        message : "not defined yet"
    })
}
const getUserById = (req, res) => {
    res.status(500).json({
        success : "success",
        message : "not defined yet"
    })
}
const updateUsers = (req, res) => {
    res.status(500).json({
        success : "success",
        message : "not defined yet"
    })
}


const TourRouter = express.Router();
const UserRouter = express.Router();


TourRouter
.route("/")
.get(getAllTours)
.post(postTour)

TourRouter
.route("/:id")
.get(getTourById)


UserRouter
.route("/")
.get(getAllUsers)
.post(postUser)

UserRouter
.route("/:id")
.get(getUserById)
.patch(updateUsers)

app.use("/api/v1/tours",TourRouter);
app.use("/api/v1/users",UserRouter);

/**
 * Todo 👉 refracting routes 👀
 * app.get("/api/v1/tours", getAllTours )
   app.get("/api/v1/tours/:id" , getTourById )
   app.post("/api/v1/tours",postTour )
 */

const port = 8000;
app.listen(port, () => {

    console.log("listening on port " + port);
});