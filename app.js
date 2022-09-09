const createError = require("http-errors");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const swaggerDoc = require("swagger-ui-express");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const testimonialRouter = require("./routes/testimonial");
const memberRouter = require("./routes/member");
const swaggerDocumentation = require("./helpers/documentation");
const activitiesRouter = require("./routes/activities");
const newsRouter = require("./routes/news");
const categoriesRouter = require("./routes/categories");
const organizationRouter = require("./routes/organization");
const contactsRouter = require("./routes/contacts")
const backofficeRouter = require("./routes/backoffice")
const commentsRouter = require("./routes/comments");
const slidesRouter = require("./routes/slides");

const app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    debug: false,
  })
);

// Disable logger to test
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/members", memberRouter);
app.use("/testimonials", testimonialRouter);
app.use("/activities", activitiesRouter);
app.use("/api/docs", swaggerDoc.serve);
app.use("/api/docs", swaggerDoc.setup(swaggerDocumentation));
app.use("/news", newsRouter)
app.use("/categories", categoriesRouter);
app.use("/organization", organizationRouter);
app.use("/contacts", contactsRouter);
app.use("/backoffice", backofficeRouter);
app.use("/comments", commentsRouter);
app.use("/slides", slidesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
