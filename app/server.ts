import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/UserController";
import { CourseController } from "./controllers/CourseController";
import { CourseSectionController } from "./controllers/CourseSectionController";
import { SectionQuestionController } from "./controllers/SectionQuestionController";

const app = createExpressServer({ controllers: [UserController, CourseController, CourseSectionController, SectionQuestionController] });
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
