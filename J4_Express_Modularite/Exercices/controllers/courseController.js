// Simulation d'une basse de données
const courses = [
    {
        id: 1,
        title: "Express.js",
        duration: 7,
        instructor: "Jean Dupont"
    },
    {
        id: 2,
        title: "SQL",
        duration: 14,
        instructor: "Marie Martin"
    }
];

// Fonction qui récupère tous les cours
export const getAllCourses = (req, res) => {
    // Vérification
    if (!courses || courses.length === 0) {
        return res.status(400).json({ error: "Il n'y a pas de cours" })
    }

    res.json(courses)

}
// Créez getCourseById
export const getCourseById = (req, res) => {
    const id = parseInt(req.params.id);  //"1"=> 1

    const course = courses.find(c => c.id === id)

    if(!course){
        return res.status(404).json({error: "Le cours n'a pas été trouvé"});
    }

    res.json(course)
}


export const createCourse = (req, res) => {
    const newCourse = req.body;

    const parsedDuration =parseInt(req.body.duration)

    if(!newCourse.title){
        return res.status(400).json({error: "Le titre est obligatoire"})
    }

    if(newCourse.title.length < 5){
        return res.status(400).json({error: "Le titre doit faire minimum 5 caractères"})
    }

    if(!parsedDuration ){
        return res.status(400).json({error: "La durée du cours est obligatoire"})
    }

    if(parsedDuration < 1 || parsedDuration > 30){
        return res.status(400).json({error: "La durée doit être entre 1 et 30"})
    }

    if(!newCourse.instructor){
        return res.status(400).json({error: "L'instructeur est obligatoire"})
    }

    if(newCourse.instructor.length < 3){
        return res.status(400).json({error: "L'instructeur doit avoir minimum 3 caractères"})
    }

    newCourse.id = courses.length + 1;
    courses.push(newCourse);
    res.status(201).json(newCourse)
}