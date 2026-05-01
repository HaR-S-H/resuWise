const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('../models/Question');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/resuwise';

// Sample questions data
const sampleQuestions = [
  // SQL Questions
  {
    category: 'SQL',
    question: 'What does SQL stand for?',
    answers: {
      answer_a: 'Structured Query Language',
      answer_b: 'Simple Question Language',
      answer_c: 'Standard Query Library',
      answer_d: 'Stored Query Language'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'SQL',
    question: 'Which command is used to remove a table in SQL?',
    answers: {
      answer_a: 'DELETE TABLE',
      answer_b: 'DROP TABLE',
      answer_c: 'REMOVE TABLE',
      answer_d: 'ERASE TABLE'
    },
    correct_answer: 'answer_b',
    difficulty: 'easy'
  },
  {
    category: 'SQL',
    question: 'What is the correct syntax for a JOIN statement?',
    answers: {
      answer_a: 'SELECT * FROM table1 JOIN table2 ON table1.id = table2.id',
      answer_b: 'SELECT * FROM table1 COMBINING table2',
      answer_c: 'SELECT * FROM table1 LINK table2',
      answer_d: 'SELECT * FROM table1 MERGE table2'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'SQL',
    question: 'Which SQL keyword is used to sort the result?',
    answers: {
      answer_a: 'SORT',
      answer_b: 'ORDER BY',
      answer_c: 'ARRANGE',
      answer_d: 'GROUP'
    },
    correct_answer: 'answer_b',
    difficulty: 'easy'
  },
  {
    category: 'SQL',
    question: 'What does PRIMARY KEY do?',
    answers: {
      answer_a: 'Uniquely identifies each record in a table',
      answer_b: 'Creates a backup of the table',
      answer_c: 'Encrypts the table data',
      answer_d: 'Deletes duplicate records'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  // CODE Questions
  {
    category: 'CODE',
    question: 'What is the purpose of a variable in programming?',
    answers: {
      answer_a: 'To store data values',
      answer_b: 'To create loops',
      answer_c: 'To define functions',
      answer_d: 'To compile code'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'CODE',
    question: 'Which of these is a loop structure?',
    answers: {
      answer_a: 'if-else',
      answer_b: 'for',
      answer_c: 'switch',
      answer_d: 'class'
    },
    correct_answer: 'answer_b',
    difficulty: 'easy'
  },
  {
    category: 'CODE',
    question: 'What is an array?',
    answers: {
      answer_a: 'A collection of elements of the same type',
      answer_b: 'A single value',
      answer_c: 'A function parameter',
      answer_d: 'A loop statement'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'CODE',
    question: "What does 'DRY' stand for in programming?",
    answers: {
      answer_a: "Don't Repeat Yourself",
      answer_b: 'Data Retrieval Yield',
      answer_c: 'Direct Resource Yielding',
      answer_d: 'Dynamic Runtime Yielding'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'CODE',
    question: 'Which is a correct way to comment in most languages?',
    answers: {
      answer_a: '// This is a comment',
      answer_b: '-- This is a comment',
      answer_c: '# This is a comment',
      answer_d: 'All of the above'
    },
    correct_answer: 'answer_d',
    difficulty: 'easy'
  },
  // REACT Questions
  {
    category: 'REACT',
    question: 'What is React?',
    answers: {
      answer_a: 'A JavaScript library for building user interfaces',
      answer_b: 'A database management system',
      answer_c: 'A backend framework',
      answer_d: 'A CSS preprocessor'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'REACT',
    question: 'What is JSX?',
    answers: {
      answer_a: 'JavaScript XML',
      answer_b: 'Java Source eXtension',
      answer_c: 'JavaScript Extension',
      answer_d: 'JSON Extension'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'REACT',
    question: 'What is a React component?',
    answers: {
      answer_a: 'A reusable piece of UI',
      answer_b: 'A database table',
      answer_c: 'A CSS class',
      answer_d: 'A server endpoint'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'REACT',
    question: 'What hook is used to manage state in functional components?',
    answers: {
      answer_a: 'useEffect',
      answer_b: 'useState',
      answer_c: 'useContext',
      answer_d: 'useCallback'
    },
    correct_answer: 'answer_b',
    difficulty: 'medium'
  },
  {
    category: 'REACT',
    question: 'What does useEffect do?',
    answers: {
      answer_a: 'Manages component state',
      answer_b: 'Performs side effects in functional components',
      answer_c: 'Creates custom hooks',
      answer_d: 'Optimizes performance'
    },
    correct_answer: 'answer_b',
    difficulty: 'medium'
  },
  // NODEJS Questions
  {
    category: 'NODEJS',
    question: 'What is Node.js?',
    answers: {
      answer_a: 'A JavaScript runtime for server-side development',
      answer_b: 'A frontend framework',
      answer_c: 'A database system',
      answer_d: 'A CSS tool'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'NODEJS',
    question: 'What is npm?',
    answers: {
      answer_a: 'Node Package Manager',
      answer_b: 'New Programming Module',
      answer_c: 'Node Project Manager',
      answer_d: 'Network Package Manager'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'NODEJS',
    question: 'What is Express.js?',
    answers: {
      answer_a: 'A web application framework for Node.js',
      answer_b: 'A database library',
      answer_c: 'A testing framework',
      answer_d: 'A CSS framework'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'NODEJS',
    question: 'What is middleware in Express?',
    answers: {
      answer_a: 'A function that has access to request and response objects',
      answer_b: 'A database query tool',
      answer_c: 'A frontend library',
      answer_d: 'A CSS preprocessor'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'NODEJS',
    question: 'Which of these is a Node.js module?',
    answers: {
      answer_a: 'fs',
      answer_b: 'path',
      answer_c: 'http',
      answer_d: 'All of the above'
    },
    correct_answer: 'answer_d',
    difficulty: 'medium'
  },
  // DOCKER Questions
  {
    category: 'DOCKER',
    question: 'What is Docker?',
    answers: {
      answer_a: 'A containerization platform',
      answer_b: 'A programming language',
      answer_c: 'A web browser',
      answer_d: 'A database'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'DOCKER',
    question: 'What is a Docker container?',
    answers: {
      answer_a: 'A lightweight, standalone executable package',
      answer_b: 'A virtual machine',
      answer_c: 'A Docker image with metadata',
      answer_d: 'A and C are correct'
    },
    correct_answer: 'answer_d',
    difficulty: 'medium'
  },
  {
    category: 'DOCKER',
    question: 'What is a Dockerfile?',
    answers: {
      answer_a: 'A text file containing instructions to build an image',
      answer_b: 'A configuration file for Docker',
      answer_c: 'A container template',
      answer_d: 'A Docker registry'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'DOCKER',
    question: 'What command builds a Docker image?',
    answers: {
      answer_a: 'docker build',
      answer_b: 'docker create',
      answer_c: 'docker make',
      answer_d: 'docker compile'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'DOCKER',
    question: 'What is Docker Hub?',
    answers: {
      answer_a: 'A cloud-based registry for Docker images',
      answer_b: 'A Docker documentation site',
      answer_c: 'A Docker development tool',
      answer_d: 'A Docker configuration utility'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  // NEXT.JS Questions
  {
    category: 'NEXT.JS',
    question: 'What is Next.js?',
    answers: {
      answer_a: 'A React framework for production',
      answer_b: 'A JavaScript library',
      answer_c: 'A CSS framework',
      answer_d: 'A database system'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'NEXT.JS',
    question: 'What is static generation in Next.js?',
    answers: {
      answer_a: 'Building pages at build time',
      answer_b: 'Building pages on each request',
      answer_c: 'Caching pages in memory',
      answer_d: 'Compiling JSX'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'NEXT.JS',
    question: 'What is the file-based router in Next.js?',
    answers: {
      answer_a: 'A routing library you need to install',
      answer_b: 'Built-in routing based on file structure',
      answer_c: 'A manual routing system',
      answer_d: 'An external routing package'
    },
    correct_answer: 'answer_b',
    difficulty: 'medium'
  },
  // POSTGRES Questions
  {
    category: 'POSTGRES',
    question: 'What is PostgreSQL?',
    answers: {
      answer_a: 'An open-source relational database system',
      answer_b: 'A NoSQL database',
      answer_c: 'A web server',
      answer_d: 'A programming language'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'POSTGRES',
    question: 'What is ACID in databases?',
    answers: {
      answer_a: 'Atomicity, Consistency, Isolation, Durability',
      answer_b: 'Active Cache Index Database',
      answer_c: 'Automatic Commit Integrity Design',
      answer_d: 'Access Control Index Descriptor'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'POSTGRES',
    question: 'What is a PRIMARY KEY in PostgreSQL?',
    answers: {
      answer_a: 'A unique identifier for each row',
      answer_b: 'A backup key',
      answer_c: 'An encryption key',
      answer_d: 'A connection key'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'POSTGRES',
    question: 'What is a foreign key?',
    answers: {
      answer_a: 'A key that references primary key in another table',
      answer_b: 'A key from another country',
      answer_c: 'An external database key',
      answer_d: 'A backup key'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'POSTGRES',
    question: 'What is an INDEX in PostgreSQL?',
    answers: {
      answer_a: 'A data structure to speed up queries',
      answer_b: 'A list of all tables',
      answer_c: 'A backup system',
      answer_d: 'A transaction log'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  // DJANGO Questions
  {
    category: 'DJANGO',
    question: 'What is Django?',
    answers: {
      answer_a: 'A Python web framework',
      answer_b: 'A JavaScript library',
      answer_c: 'A database system',
      answer_d: 'A CSS framework'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'DJANGO',
    question: 'What is Django ORM?',
    answers: {
      answer_a: 'Object-Relational Mapping',
      answer_b: 'Operational Resource Manager',
      answer_c: 'Online Repository Manager',
      answer_d: 'Object Request Manager'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'DJANGO',
    question: 'What is a Django Model?',
    answers: {
      answer_a: 'A class that defines database structure',
      answer_b: 'A template file',
      answer_c: 'A view function',
      answer_d: 'A URL pattern'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'DJANGO',
    question: 'What is Django Admin?',
    answers: {
      answer_a: 'An auto-generated admin interface',
      answer_b: 'A database tool',
      answer_c: 'A security feature',
      answer_d: 'A testing framework'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'DJANGO',
    question: 'What is the MTV pattern in Django?',
    answers: {
      answer_a: 'Model-Template-View',
      answer_b: 'Model-Test-View',
      answer_c: 'Module-Template-Validator',
      answer_d: 'Memory-Token-Variable'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  // VUEJS Questions
  {
    category: 'VUEJS',
    question: 'What is Vue.js?',
    answers: {
      answer_a: 'A progressive JavaScript framework',
      answer_b: 'A CSS framework',
      answer_c: 'A database system',
      answer_d: 'A server framework'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'VUEJS',
    question: 'What is a Vue component?',
    answers: {
      answer_a: 'A reusable piece of UI with logic',
      answer_b: 'A CSS class',
      answer_c: 'A JavaScript function',
      answer_d: 'A database table'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'VUEJS',
    question: 'What is reactive data in Vue?',
    answers: {
      answer_a: 'Data that automatically updates the UI when changed',
      answer_b: 'Data stored in a database',
      answer_c: 'Data sent from server',
      answer_d: 'Data in local storage'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'VUEJS',
    question: 'What is v-bind in Vue?',
    answers: {
      answer_a: 'A directive to bind data to attributes',
      answer_b: 'A loop directive',
      answer_c: 'A conditional directive',
      answer_d: 'An event directive'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'VUEJS',
    question: 'What is v-for?',
    answers: {
      answer_a: 'A directive for rendering lists',
      answer_b: 'A conditional directive',
      answer_c: 'An event listener',
      answer_d: 'A data binding method'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  // WORDPRESS Questions
  {
    category: 'WORDPRESS',
    question: 'What is WordPress?',
    answers: {
      answer_a: 'An open-source content management system',
      answer_b: 'A programming language',
      answer_c: 'A web server',
      answer_d: 'A database system'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'WORDPRESS',
    question: 'What is a WordPress theme?',
    answers: {
      answer_a: 'A collection of files that define site appearance',
      answer_b: 'A plugin',
      answer_c: 'A database template',
      answer_d: 'A user role'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'WORDPRESS',
    question: 'What is a WordPress plugin?',
    answers: {
      answer_a: 'Software that extends WordPress functionality',
      answer_b: 'A theme file',
      answer_c: 'A template system',
      answer_d: 'A database table'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'WORDPRESS',
    question: 'What is a WordPress post?',
    answers: {
      answer_a: 'A piece of content with timestamp',
      answer_b: 'A database backup',
      answer_c: 'A server installation',
      answer_d: 'A security update'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'WORDPRESS',
    question: 'What is the WordPress dashboard?',
    answers: {
      answer_a: 'The main admin interface for managing WordPress',
      answer_b: 'A frontend page',
      answer_c: 'A backup system',
      answer_d: 'A plugin directory'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  // LINUX Questions
  {
    category: 'LINUX',
    question: 'What is Linux?',
    answers: {
      answer_a: 'An open-source operating system kernel',
      answer_b: 'A programming language',
      answer_c: 'A web browser',
      answer_d: 'A database'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'LINUX',
    question: 'What is the Linux file system hierarchy?',
    answers: {
      answer_a: 'The directory structure starting from root (/)',
      answer_b: 'A method to compress files',
      answer_c: 'A backup system',
      answer_d: 'A permission system'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'LINUX',
    question: 'What is chmod used for?',
    answers: {
      answer_a: 'Changing file permissions',
      answer_b: 'Creating directories',
      answer_c: 'Compressing files',
      answer_d: 'Copying files'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'LINUX',
    question: 'What does sudo do?',
    answers: {
      answer_a: 'Executes commands with superuser privileges',
      answer_b: 'Creates a new user',
      answer_c: 'Lists directories',
      answer_d: 'Removes files'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'LINUX',
    question: 'What is the difference between / and /home?',
    answers: {
      answer_a: '/ is root directory, /home contains user files',
      answer_b: '/ is temporary, /home is permanent',
      answer_c: '/ is for system, /home is for backups',
      answer_d: '/ is for servers, /home is for desktops'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  // BASH Questions
  {
    category: 'BASH',
    question: 'What is Bash?',
    answers: {
      answer_a: 'A Unix shell and command language',
      answer_b: 'A programming language',
      answer_c: 'A database system',
      answer_d: 'A web server'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'BASH',
    question: 'What does the pipe (|) operator do?',
    answers: {
      answer_a: 'Passes output of one command to another',
      answer_b: 'Creates a file',
      answer_c: 'Lists files',
      answer_d: 'Changes directory'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'BASH',
    question: 'What is redirection in Bash?',
    answers: {
      answer_a: 'Sending input/output to files or other places',
      answer_b: 'Changing directory',
      answer_c: 'Creating symbolic links',
      answer_d: 'Backing up files'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'BASH',
    question: 'What does grep do?',
    answers: {
      answer_a: 'Searches for patterns in files',
      answer_b: 'Creates directories',
      answer_c: 'Removes files',
      answer_d: 'Copies files'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'BASH',
    question: 'What is a shell script?',
    answers: {
      answer_a: 'A file containing shell commands to be executed',
      answer_b: 'A system configuration file',
      answer_c: 'A backup script',
      answer_d: 'A security file'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  // DEVOPS Questions
  {
    category: 'DEVOPS',
    question: 'What is DevOps?',
    answers: {
      answer_a: 'A culture combining development and operations',
      answer_b: 'A programming language',
      answer_c: 'A database system',
      answer_d: 'A web framework'
    },
    correct_answer: 'answer_a',
    difficulty: 'easy'
  },
  {
    category: 'DEVOPS',
    question: 'What is CI/CD?',
    answers: {
      answer_a: 'Continuous Integration and Continuous Deployment',
      answer_b: 'Code Integration and Database',
      answer_c: 'Configuration and Deployment',
      answer_d: 'Compile and Deploy'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'DEVOPS',
    question: 'What is Infrastructure as Code (IaC)?',
    answers: {
      answer_a: 'Managing infrastructure using code and automation',
      answer_b: 'Writing code on the server',
      answer_c: 'Encoding infrastructure documentation',
      answer_d: 'A backup method'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'DEVOPS',
    question: 'What is Kubernetes?',
    answers: {
      answer_a: 'An orchestration platform for containerized applications',
      answer_b: 'A programming language',
      answer_c: 'A web server',
      answer_d: 'A database system'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  },
  {
    category: 'DEVOPS',
    question: 'What is Jenkins?',
    answers: {
      answer_a: 'An open-source automation server for CI/CD',
      answer_b: 'A database system',
      answer_c: 'A web framework',
      answer_d: 'A container registry'
    },
    correct_answer: 'answer_a',
    difficulty: 'medium'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert sample questions
    const inserted = await Question.insertMany(sampleQuestions);
    console.log(`✅ Successfully seeded ${inserted.length} questions`);

    // Display stats
    const stats = await Question.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    console.log('\n📊 Questions per category:');
    stats.forEach(stat => {
      console.log(`  ${stat._id}: ${stat.count} questions`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
