var bio = {
    "name": "Ivan Baranov",
    "role": "Front-End Developer Apprentice",
    "welcomeMessage": "HELLO WORLD",
    "contacts": {
        "email": "ibaranov@yandex.ru",
        "githublink": "https://github.com/Hustof",
        "github": "Hustof",
        "location": "Moscow, RU, Russia",
        "linkedin": "",
        "mobile": "8(800)555-44-44",
        "twitter": "twitter.com/Hustof"
    },
    "skills": ["Windows", "Linux", "HTML/CSS", "Python"],
    "biopic": "images/photo.jpeg",
    display: function() {
        var formattedRole = HTMLheaderRole.replace('%data%', bio.role);
        $("#header").prepend(formattedRole);
        var formattedName = HTMLheaderName.replace('%data%', bio.name);
        $("#header").prepend(formattedName);

        var formattedLocation = HTMLlocation.replace('%data%', bio.contacts.location)
        var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
        var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
        var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
        var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
        $("#topContacts").prepend(formattedLocation, formattedTwitter, formattedGithub, formattedEmail, formattedMobile);
        $("#footerContacts").prepend(formattedLocation, formattedTwitter, formattedGithub, formattedEmail, formattedMobile);

        var WelcomeMessage = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);
        $("#header").append(WelcomeMessage);
        var formattedPic = HTMLbioPic.replace("%data%", bio.biopic);
        $("#header").append(formattedPic);

        if (bio.skills.length > 0) {
            $("#header").append(HTMLskillsStart);

            bio.skills.forEach(function(skill) {
                formattedskill = HTMLskills.replace("%data%", skill);
                $("#skills").append(formattedskill);
            });
        }
    }
};

var education = {
    "schools": [{
            "name": "High School",
            "location": "Moscow, Russia",
            "degree": "High School Diploma",
            "majors": ["Russia", "English"],
            "dates": "From: 1986 To: 2008",
            "url": "#"
        },
        {
            "name": "Moscow power engineering institute",
            "location": "Moscow, Russia",
            "degree": "Information security",
            "majors": ["IB", "IT"],
            "dates": "From: 2008 To: 2013",
            "url": "https://mpei.ru"
        }
    ],
    "onlineCourses": [{
            "title": "Intro to HTML and CSS",
            "school": "Udacity",
            "dates": "2016",
            "url": "http://www.udacity.com"
        },
        {
            "title": "JavaScript basics",
            "school": "Udacity",
            "dates": "2016",
            "url": "http://www.udacity.com"
        },
        {
            "title": "Front-end programming nanodegree",
            "school": "Udacity",
            "dates": "2016",
            "url": "http://www.udacity.com"
        }
    ],
    display: function() {
        education.schools.forEach(function(school) {
            $("#education").append(HTMLschoolStart);
            var formattedName = HTMLschoolName.replace('%data%', school.name);
            $(".education-entry:last").append(formattedName);
            var formattedDates = HTMLschoolDates.replace('%data%', school.dates);
            $(".education-entry:last").append(formattedDates);
            var formattedLocation = HTMLschoolLocation.replace('%data%', school.location);
            $(".education-entry:last").prepend(formattedLocation);
            var formattedDegree = HTMLschoolDegree.replace('%data%', school.degree);
            $(".education-entry:last").append(formattedDegree);
            var formattedDegree = HTMLschoolMajor.replace("%data%", school.majors);
            $(".education-entry:last").append(formattedDegree);

        });
        education.onlineCourses.forEach(function(course) {
            var formattedTitle = HTMLonlineTitle.replace("%data%", course.title);
            $(".education-entry:last").append(formattedTitle);
            var formattedSchool = HTMLonlineSchool.replace("%data%", course.school);
            $(".education-entry:last").append(formattedSchool);
            var formattedDates = HTMLonlineDates.replace("%data%", course.dates);
            $(".education-entry:last").append(formattedDates);
            var formattedURL = HTMLonlineURL.replace("%data%", course.url);
            $(".education-entry:last").append(formattedURL);
        });
    }
};

var work = {
    "jobs": [{
            "employer": "Bank",
            "title": "System administrator",
            "location": "Moscow, RU",
            "dates": "2015 to current",
            "description": "Admin and Support"
        },
        {
            "employer": "Advertising agency",
            "title": "Moscow, RU",
            "location": "System administrator",
            "dates": "2013 to 2015",
            "description": "Admin and Support"
        }
    ],
    display: function() {
        work.jobs.forEach(function(job) {
            $("#workExperience").append(HTMLworkStart);
            var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
            var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
            var formattedEmployerTitle = formattedEmployer + formattedTitle;
            $(".work-entry:last").append(formattedEmployerTitle);
            var formattedDates = HTMLworkDates.replace("%data%", job.dates);
            $(".work-entry:last").append(formattedDates);
            var formattedDescription = HTMLworkDescription.replace("%data%", job.description);
            $(".work-entry:last").append(formattedDescription);
            var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
            $(".work-entry:last").prepend(formattedLocation);
        });
    }
};

var projects = {
    "projects": [{
        "title": "MY PRO FRONT-END PORTFOLIO",
        "dates": "2017",
        "description": "Build a Portfolio Site",
        "images": ["images/front-end.PNG"]
    }],
    display: function() {
        projects.projects.forEach(function(project) {
            $("#projects").append(HTMLprojectStart);

            var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
            $(".project-entry:last").append(formattedTitle);

            var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
            $(".project-entry:last").append(formattedDates);

            var formattedDescription = HTMLprojectDescription.replace("%data%", project.description);
            $(".project-entry:last").append(formattedDescription);

            project.images.forEach(function(image) {
                formattedImage = HTMLprojectImage.replace("%data%", image);
                $(".project-entry:last").append(formattedImage);
            });
        });
    }
};

work.display();
education.display();
projects.display();
bio.display();

$("#mapDiv").append(googleMap);