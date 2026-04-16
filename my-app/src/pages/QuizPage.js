import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const fundamentalsQuestions = [
  {
    id: 1,
    question: 'Which SQL command is used to remove duplicates from query results?',
    options: ['DISTINCT', 'GROUP BY', 'UNION', 'FILTER'],
    answer: 'DISTINCT',
  },
  {
    id: 2,
    question: 'Which layer of the OSI model handles routing?',
    options: ['Transport', 'Network', 'Data Link', 'Session'],
    answer: 'Network',
  },
  {
    id: 3,
    question: 'Which design model is best for evolving requirements?',
    options: ['Waterfall', 'V-Model', 'Spiral', 'Agile'],
    answer: 'Agile',
  },
];

const domainQuestions = {
  'ai-and-ml': [
    { id: 1, question: 'What is the primary goal of supervised learning?', options: ['Find patterns', 'Predict outcomes', 'Cluster data', 'Reduce dimensions'], answer: 'Predict outcomes' },
    { id: 2, question: 'Which algorithm is used for classification tasks?', options: ['K-means', 'Linear Regression', 'Random Forest', 'PCA'], answer: 'Random Forest' },
    { id: 3, question: 'What does CNN stand for?', options: ['Complex Neural Network', 'Convolutional Neural Network', 'Collaborative Neural Network', 'Connected Neural Network'], answer: 'Convolutional Neural Network' },
    { id: 4, question: 'What is overfitting in machine learning?', options: ['Model too simple', 'Model memorizes training data', 'Model is fast', 'Model needs more data'], answer: 'Model memorizes training data' },
    { id: 5, question: 'Which library is used for numerical computing in Python?', options: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow'], answer: 'NumPy' },
    { id: 6, question: 'What does accuracy measure in classification?', options: ['False positives', 'Correct predictions / Total predictions', 'Model speed', 'Training time'], answer: 'Correct predictions / Total predictions' },
    { id: 7, question: 'Which technique reduces dimensionality in data?', options: ['K-means', 'PCA', 'Linear Regression', 'Decision Trees'], answer: 'PCA' },
    { id: 8, question: 'What is backpropagation used for?', options: ['Forward pass', 'Training neural networks', 'Data preprocessing', 'Model evaluation'], answer: 'Training neural networks' },
    { id: 9, question: 'Which algorithm is used for unsupervised clustering?', options: ['SVM', 'K-means', 'Logistic Regression', 'Random Forest'], answer: 'K-means' },
    { id: 10, question: 'What is a hyperparameter?', options: ['Output of model', 'Parameter learned during training', 'Setting configured before training', 'Loss function value'], answer: 'Setting configured before training' },
  ],
  'web-development': [
    { id: 1, question: 'Which of these is a frontend framework?', options: ['Django', 'React', 'Flask', 'Spring'], answer: 'React' },
    { id: 2, question: 'What does REST API stand for?', options: ['Representational State Transfer', 'Remote Entity Service Transfer', 'Resource Exchange Service Tool', 'Real-time Entity Synchronization'], answer: 'Representational State Transfer' },
    { id: 3, question: 'Which language is essential for web development?', options: ['Python', 'JavaScript', 'Java', 'C++'], answer: 'JavaScript' },
    { id: 4, question: 'What is DOM in web development?', options: ['Data Object Model', 'Document Object Model', 'Dynamic Output Method', 'Database Model'], answer: 'Document Object Model' },
    { id: 5, question: 'Which CSS property centers text?', options: ['text-align: center', 'align: center', 'center: text', 'text: center'], answer: 'text-align: center' },
    { id: 6, question: 'What does async/await do?', options: ['Runs code in parallel', 'Handles asynchronous operations', 'Speeds up server', 'Caches data'], answer: 'Handles asynchronous operations' },
    { id: 7, question: 'Which HTTP method is used to retrieve data?', options: ['POST', 'PUT', 'GET', 'DELETE'], answer: 'GET' },
    { id: 8, question: 'What is a React Hook?', options: ['Error handler', 'Function for state/lifecycle', 'CSS selector', 'Database query'], answer: 'Function for state/lifecycle' },
    { id: 9, question: 'Which is a backend framework for Node.js?', options: ['Vue', 'Angular', 'Express', 'Jest'], answer: 'Express' },
    { id: 10, question: 'What does CORS stand for?', options: ['Cross-Origin Resource Sharing', 'Cross-Origin Request Security', 'Compressed Origin Resources', 'Core Request System'], answer: 'Cross-Origin Resource Sharing' },
  ],
  'cloud-and-devops': [
    { id: 1, question: 'What does IaC stand for?', options: ['Infrastructure as Code', 'Internet and Cloud', 'Internal Architecture Check', 'Interface and Configuration'], answer: 'Infrastructure as Code' },
    { id: 2, question: 'Which is a containerization platform?', options: ['Kubernetes', 'Docker', 'Both A and B', 'Jenkins'], answer: 'Both A and B' },
    { id: 3, question: 'What does CI/CD stand for?', options: ['Configuration and Integration', 'Continuous Integration/Continuous Deployment', 'Cloud Infrastructure', 'Code Integration'], answer: 'Continuous Integration/Continuous Deployment' },
    { id: 4, question: 'Which cloud platform is most widely used?', options: ['AWS', 'Azure', 'GCP', 'All equally'], answer: 'AWS' },
    { id: 5, question: 'What is Kubernetes used for?', options: ['Container orchestration', 'Web hosting', 'Database management', 'Code compilation'], answer: 'Container orchestration' },
    { id: 6, question: 'Which tool is used for Infrastructure as Code with AWS?', options: ['Docker', 'Kubernetes', 'CloudFormation', 'Jenkins'], answer: 'CloudFormation' },
    { id: 7, question: 'What is a microservice?', options: ['Small service', 'Independent deployable service', 'Tiny application', 'API endpoint'], answer: 'Independent deployable service' },
    { id: 8, question: 'What does GitLab CI do?', options: ['Version control', 'Automated testing and deployment', 'Data storage', 'Server hosting'], answer: 'Automated testing and deployment' },
    { id: 9, question: 'Which is a monitoring tool for cloud infrastructure?', options: ['Docker', 'Prometheus', 'Git', 'Maven'], answer: 'Prometheus' },
    { id: 10, question: 'What is auto-scaling?', options: ['Manual scaling', 'Automatic resource adjustment based on demand', 'IP scaling', 'Load balancing'], answer: 'Automatic resource adjustment based on demand' },
  ],
  'cybersecurity': [
    { id: 1, question: 'What is encryption used for?', options: ['Speed up data', 'Protect data', 'Reduce size', 'Share data'], answer: 'Protect data' },
    { id: 2, question: 'Which is a common cybersecurity threat?', options: ['Malware', 'Phishing', 'DDoS', 'All of the above'], answer: 'All of the above' },
    { id: 3, question: 'What does VPN stand for?', options: ['Very Private Network', 'Virtual Private Network', 'Vertical Protocol Network', 'Virtual Protocol Node'], answer: 'Virtual Private Network' },
    { id: 4, question: 'What is a firewall?', options: ['Burning wall', 'Network security system', 'Antivirus software', 'Password manager'], answer: 'Network security system' },
    { id: 5, question: 'Which is the strongest password?', options: ['123456', 'Password', 'aB@3x9mK#2pL', 'qwerty'], answer: 'aB@3x9mK#2pL' },
    { id: 6, question: 'What is two-factor authentication?', options: ['Two passwords', 'Password + second verification method', 'Two devices', 'Security question'], answer: 'Password + second verification method' },
    { id: 7, question: 'What does SSL stand for?', options: ['Secure Socket Layer', 'System Security Level', 'Software Setup Link', 'Secure Service Layer'], answer: 'Secure Socket Layer' },
    { id: 8, question: 'What is a zero-day exploit?', options: ['New daily attack', 'Unknown vulnerability', 'Delayed attack', 'Scheduled attack'], answer: 'Unknown vulnerability' },
    { id: 9, question: 'Which framework describes security best practices?', options: ['NIST', 'ISO 27001', 'Both A and B', 'OWASP only'], answer: 'Both A and B' },
    { id: 10, question: 'What is social engineering?', options: ['Social media hacking', 'Manipulating people to disclose secrets', 'Network attack', 'Malware creation'], answer: 'Manipulating people to disclose secrets' },
  ],
  'data-science': [
    { id: 1, question: 'What is the main goal of data science?', options: ['Collect data', 'Extract insights from data', 'Delete data', 'Store data'], answer: 'Extract insights from data' },
    { id: 2, question: 'Which library is used for data visualization in Python?', options: ['NumPy', 'Matplotlib', 'Scikit-learn', 'Keras'], answer: 'Matplotlib' },
    { id: 3, question: 'What is data cleaning?', options: ['Deleting all data', 'Removing bad data and fixing errors', 'Compressing data', 'Backing up data'], answer: 'Removing bad data and fixing errors' },
    { id: 4, question: 'What does EDA stand for?', options: ['Electronic Data Analysis', 'Exploratory Data Analysis', 'Efficient Database Analysis', 'Expert Data Architecture'], answer: 'Exploratory Data Analysis' },
    { id: 5, question: 'Which is a big data technology?', options: ['Excel', 'Hadoop', 'Pandas', 'SQLite'], answer: 'Hadoop' },
    { id: 6, question: 'What is missing data imputation?', options: ['Deleting rows', 'Filling missing values', 'Ignoring missing data', 'Creating backup'], answer: 'Filling missing values' },
    { id: 7, question: 'What is correlation in statistics?', options: ['Copying data', 'Relationship between variables', 'Data backup', 'Error checking'], answer: 'Relationship between variables' },
    { id: 8, question: 'Which format is best for big data?', options: ['CSV', 'JSON', 'Parquet', 'TXT'], answer: 'Parquet' },
    { id: 9, question: 'What is a pivot table used for?', options: ['Rotating data', 'Summarizing data', 'Both A and B', 'Deleting rows'], answer: 'Both A and B' },
    { id: 10, question: 'What is SQL used for in data science?', options: ['Web design', 'Database querying', 'Machine learning', 'API design'], answer: 'Database querying' },
  ],
  'mobile-development': [
    { id: 1, question: 'Which framework is used for cross-platform mobile development?', options: ['React Native', 'Django', 'Flask', 'Express'], answer: 'React Native' },
    { id: 2, question: 'What is Android developed with?', options: ['Swift', 'Java/Kotlin', 'C#', 'Python'], answer: 'Java/Kotlin' },
    { id: 3, question: 'What is iOS developed with?', options: ['Java', 'Kotlin', 'Swift', 'JavaScript'], answer: 'Swift' },
    { id: 4, question: 'What is Flutter?', options: ['Mobile framework by Google', 'Backend service', 'Database tool', 'IDE'], answer: 'Mobile framework by Google' },
    { id: 5, question: 'What does APK stand for?', options: ['Android Package Kit', 'Application Packaging Kit', 'Android Platform Kit', 'API Package Kit'], answer: 'Android Package Kit' },
    { id: 6, question: 'What is responsive design in mobile?', options: ['Fast loading', 'Adapts to screen size', 'High resolution', 'Small file size'], answer: 'Adapts to screen size' },
    { id: 7, question: 'Which is a mobile testing framework?', options: ['Jest', 'Appium', 'Selenium', 'Mocha'], answer: 'Appium' },
    { id: 8, question: 'What are lifecycle methods for?', options: ['App state management', 'UI design', 'Code execution', 'Performance testing'], answer: 'App state management' },
    { id: 9, question: 'What is push notification used for?', options: ['Data storage', 'Sending alerts to users', 'Code compilation', 'Database backup'], answer: 'Sending alerts to users' },
    { id: 10, question: 'What is deep linking in mobile apps?', options: ['Deep copy', 'Direct linking to specific app content', 'Network protocol', 'Security feature'], answer: 'Direct linking to specific app content' },
  ],
  'blockchain': [
    { id: 1, question: 'What is blockchain?', options: ['Block of data', 'Distributed ledger technology', 'Database', 'Encryption method'], answer: 'Distributed ledger technology' },
    { id: 2, question: 'What is a smart contract?', options: ['Digital agreement', 'Self-executing contract on blockchain', 'Business deal', 'Legal document'], answer: 'Self-executing contract on blockchain' },
    { id: 3, question: 'Which blockchain platform supports smart contracts?', options: ['Bitcoin', 'Ethereum', 'Both A and B', 'Dogecoin'], answer: 'Ethereum' },
    { id: 4, question: 'What is consensus mechanism?', options: ['Agreement method', 'Network agreement on valid state', 'Voting system', 'Communication protocol'], answer: 'Network agreement on valid state' },
    { id: 5, question: 'What does PoW stand for?', options: ['Proof of Work', 'Proof of Wallet', 'Protocol of Wealth', 'Process of Web'], answer: 'Proof of Work' },
    { id: 6, question: 'What is a cryptocurrency wallet?', options: ['Physical wallet', 'Digital storage for cryptocurrencies', 'Banking app', 'Payment method'], answer: 'Digital storage for cryptocurrencies' },
    { id: 7, question: 'What is mining in blockchain?', options: ['Data deletion', 'Validating transactions and creating blocks', 'Code compilation', 'Data encryption'], answer: 'Validating transactions and creating blocks' },
    { id: 8, question: 'What is immutability in blockchain?', options: ['Can be changed', 'Cannot be altered once recorded', 'Data loss', 'Temporary storage'], answer: 'Cannot be altered once recorded' },
    { id: 9, question: 'What does DeFi stand for?', options: ['Decentralized Finance', 'Digital Finance', 'Data Finance', 'Distributed Fee'], answer: 'Decentralized Finance' },
    { id: 10, question: 'What is a hash in blockchain?', options: ['Hashtag', 'Unique digital fingerprint of data', 'Random number', 'Encryption key'], answer: 'Unique digital fingerprint of data' },
  ],
  'ui-ux-design': [
    { id: 1, question: 'What does UX stand for?', options: ['User Extension', 'User Experience', 'Universal eXchange', 'User Export'], answer: 'User Experience' },
    { id: 2, question: 'What is a wireframe?', options: ['Network diagram', 'Low-fidelity design layout', 'Circuit design', 'Database schema'], answer: 'Low-fidelity design layout' },
    { id: 3, question: 'What is color theory?', options: ['History of colors', 'Principle of color usage', 'Paint mixing', 'Light waves'], answer: 'Principle of color usage' },
    { id: 4, question: 'What does typography in design refer to?', options: ['Text layout', 'Art of arranging type/text', 'Font file', 'Writing style'], answer: 'Art of arranging type/text' },
    { id: 5, question: 'What is a user persona?', options: ['Real user', 'Fictional representation of target user', 'Employee profile', 'Designer name'], answer: 'Fictional representation of target user' },
    { id: 6, question: 'What is accessibility in design?', options: ['Easy to reach', 'Usable by everyone including disabled', 'Fast loading', 'Mobile friendly'], answer: 'Usable by everyone including disabled' },
    { id: 7, question: 'What is prototyping?', options: ['Final product', 'Interactive model of design', 'Code compilation', 'Testing phase'], answer: 'Interactive model of design' },
    { id: 8, question: 'What is the rule of thirds?', options: ['Design rule', 'Dividing visual into 9 parts', 'Color theory', 'Typography rule'], answer: 'Dividing visual into 9 parts' },
    { id: 9, question: 'What does usability testing involve?', options: ['Code testing', 'Observing real users interacting with design', 'Security check', 'Performance test'], answer: 'Observing real users interacting with design' },
    { id: 10, question: 'What is information architecture?', options: ['Database design', 'Organizing content structure', 'Building layout', 'Network topology'], answer: 'Organizing content structure' },
  ],
  'big-data': [
    { id: 1, question: 'What are the 3 Vs of Big Data?', options: ['Value, Volume, Velocity', 'Very, Vast, Vigorous', 'Virtual, Visual, Victory', 'Verify, Validate, Vitality'], answer: 'Value, Volume, Velocity' },
    { id: 2, question: 'Which tool is used for big data processing?', options: ['Excel', 'Apache Spark', 'Notepad', 'Paint'], answer: 'Apache Spark' },
    { id: 3, question: 'What is MapReduce?', options: ['Navigation', 'Data processing framework', 'Mapping function', 'Reduction algorithm'], answer: 'Data processing framework' },
    { id: 4, question: 'What is Hadoop used for?', options: ['Web hosting', 'Distributed data processing', 'Email service', 'File sharing'], answer: 'Distributed data processing' },
    { id: 5, question: 'What is HDFS?', options: ['Hard Disk File System', 'Hadoop Distributed File System', 'Hybrid Data Format', 'High Definition File Service'], answer: 'Hadoop Distributed File System' },
    { id: 6, question: 'What is streaming data?', options: ['Video streaming', 'Continuous flow of data', 'Data download', 'Data buffering'], answer: 'Continuous flow of data' },
    { id: 7, question: 'Which database is designed for big data?', options: ['MySQL', 'NoSQL', 'SQLite', 'PostgreSQL'], answer: 'NoSQL' },
    { id: 8, question: 'What is data lake?', options: ['Physical lake', 'Centralized repository for raw data', 'Water storage', 'Data warehouse'], answer: 'Centralized repository for raw data' },
    { id: 9, question: 'What does ETL stand for?', options: ['Export, Transform, Load', 'Extract, Transform, Load', 'Encrypt, Transmit, Lock', 'Edit, Track, Link'], answer: 'Extract, Transform, Load' },
    { id: 10, question: 'What is Kafka used for?', options: ['Coffee', 'Event streaming platform', 'Text editor', 'Chat application'], answer: 'Event streaming platform' },
  ],
  'networking': [
    { id: 1, question: 'What does TCP/IP stand for?', options: ['Transfer Protocol Internet', 'Transmission Control Protocol/Internet Protocol', 'Technical Connection Path', 'Text Communication Protocol'], answer: 'Transmission Control Protocol/Internet Protocol' },
    { id: 2, question: 'Which layer of OSI model handles routing?', options: ['Transport', 'Network', 'Data Link', 'Session'], answer: 'Network' },
    { id: 3, question: 'What is an IP address?', options: ['Internal Page', 'Internet Protocol address', 'Internal Password', 'Internet Port'], answer: 'Internet Protocol address' },
    { id: 4, question: 'What does DNS do?', options: ['Delete files', 'Translate domain names to IP addresses', 'Data storage', 'Disk management'], answer: 'Translate domain names to IP addresses' },
    { id: 5, question: 'What is bandwidth?', options: ['Wide band', 'Maximum data transfer rate', 'Signal strength', 'Connection speed'], answer: 'Maximum data transfer rate' },
    { id: 6, question: 'What is a subnet?', options: ['Under water', 'Subdivision of network', 'Sub protocol', 'Small network'], answer: 'Subdivision of network' },
    { id: 7, question: 'What does DHCP do?', options: ['Protocol design', 'Automatically assign IP addresses', 'Encrypt data', 'Manage files'], answer: 'Automatically assign IP addresses' },
    { id: 8, question: 'What is latency?', options: ['Delay in data transmission', 'Data speed', 'Connection type', 'Bandwidth capacity'], answer: 'Delay in data transmission' },
    { id: 9, question: 'What is packet switching?', options: ['Cable switching', 'Data divided into packets routed independently', 'Manual routing', 'Physical connection'], answer: 'Data divided into packets routed independently' },
    { id: 10, question: 'What does NAT stand for?', options: ['Network Access Tool', 'Network Address Translation', 'Network Adaptation Tech', 'Network Attach Terminal'], answer: 'Network Address Translation' },
  ],
};

const generateRoadmap = (pathType, domain = null, timelineWeeks = 12, timelineDays = 60) => {
  // Detailed daily tasks for each domain
  const baseTasksTemplates = {
    'ai-and-ml': [
      'Install Python 3.x and set up Jupyter Notebook environment',
      'Learn Python basics: variables, data types, operators, and control flow',
      'Practice loops, functions, and basic data structures (lists, dictionaries)',
      'Introduction to NumPy: arrays, slicing, and basic operations',
      'Learn Pandas: DataFrames, Series, and data manipulation',
      'Data loading: read CSV/JSON, handle missing values',
      'Data cleaning: outlier detection and handling',
      'Exploratory Data Analysis: descriptive statistics',
      'Data visualization with Matplotlib: plots, histograms, scatter plots',
      'Statistical concepts: mean, median, standard deviation, correlation',
      'Linear Regression: theory and implementation',
      'Practice linear regression with real dataset',
      'Logistic Regression and classification metrics',
      'Decision Trees: building and interpreting',
      'Random Forest: ensemble methods and feature importance',
      'Cross-validation and model evaluation techniques',
      'Hyperparameter tuning: GridSearchCV and RandomizedSearchCV',
      'Neural Networks basics: perceptron, backpropagation',
      'TensorFlow/Keras: building simple neural networks',
      'CNN architecture: convolutions, pooling, and filters',
      'Practical CNN: image classification project setup',
      'RNN and LSTM: sequence models and time series',
      'NLP basics: tokenization, stemming, lemmatization',
      'Text preprocessing and feature extraction (TF-IDF, Word2Vec)',
      'Language models: pre-trained models (BERT, GPT)',
      'MLOps basics: model versioning and deployment',
      'Model deployment: Flask/FastAPI with ML models',
      'Monitoring models in production',
      'AI ethics and bias detection',
      'Capstone project: end-to-end ML pipeline',
    ],
    'web-development': [
      'HTML basics: structure, tags, semantic HTML5',
      'CSS fundamentals: selectors, box model, flexbox',
      'Responsive design: media queries and mobile-first approach',
      'JavaScript basics: variables, operators, control flow',
      'JavaScript ES6: arrow functions, destructuring, spread operator',
      'DOM manipulation: selecting and modifying elements',
      'Event handling: click, submit, input events',
      'Introduction to React: components and JSX',
      'React state: useState hook basics',
      'React effects: useEffect for side effects',
      'Props passing: parent to child communication',
      'Component lifecycle: mounting, updating, unmounting',
      'React Router: creating multi-page applications',
      'Form handling: controlled components and validation',
      'API basics: HTTP methods (GET, POST, PUT, DELETE)',
      'Fetch API: making HTTP requests',
      'Building REST APIs: endpoints and status codes',
      'Server setup: Node.js and Express basics',
      'Express routing and middleware',
      'Database design: SQL basics and normalization',
      'Authentication: JWT tokens and sessions',
      'Password security: hashing and encryption',
      'API integration: connecting frontend to backend',
      'Error handling and logging',
      'Testing: unit tests with Jest',
      'Performance optimization: lazy loading and code splitting',
      'Build tools: Webpack and bundling',
      'Deployment: Vercel, Netlify for frontend',
      'Backend deployment: Heroku or cloud platforms',
      'Full-stack project: planning and architecture',
      'Capstone: build, optimize, and deploy complete app',
    ],
    'cloud-and-devops': [
      'Cloud basics: IaaS, PaaS, SaaS concepts',
      'AWS account setup and IAM roles',
      'EC2 instances: launching and managing virtual machines',
      'Security groups: configuring firewall rules',
      'VPC: networking in AWS',
      'S3 buckets: object storage and management',
      'RDS: managed relational databases',
      'Introduction to containers: Docker basics',
      'Dockerfile: building containerized applications',
      'Docker Compose: multi-container applications',
      'Docker Hub: pushing and pulling images',
      'Kubernetes basics: pods, services, deployments',
      'Helm: Kubernetes package management',
      'Infrastructure as Code: Terraform basics',
      'Terraform: AWS resource provisioning',
      'CloudFormation: AWS templating',
      'Git workflows: branching and merging',
      'CI/CD basics: continuous integration and deployment',
      'Jenkins: pipeline configuration',
      'GitLab CI: automated testing and deployment',
      'GitHub Actions: CI/CD with GitHub',
      'Monitoring: CloudWatch and Prometheus',
      'Logging: centralized log management (ELK)',
      'Alerting: setting up notifications',
      'Load balancing: distributing traffic',
      'Auto-scaling: dynamic resource management',
      'Multi-region deployment',
      'Disaster recovery planning',
      'DevOps best practices and tools review',
      'Capstone: build CI/CD pipeline for real project',
    ],
    'cybersecurity': [
      'Security fundamentals: CIA triad (Confidentiality, Integrity, Availability)',
      'Threat models: identifying potential attacks',
      'Attack vectors: common security vulnerabilities',
      'Risk assessment: identifying and rating risks',
      'Cryptography basics: symmetric vs asym encryption',
      'Caesar cipher and classic cryptography',
      'Modern encryption: AES, RSA algorithms',
      'Hashing: MD5, SHA-256, and password hashing',
      'Digital signatures and certificates',
      'Network security: NAT, proxy, DMZ',
      'Firewalls: stateless vs stateful',
      'Intrusion Detection Systems (IDS)',
      'OWASP Top 10: understanding critical web vulnerabilities',
      'SQL injection: attack and prevention',
      'Cross-Site Scripting (XSS): types and mitigation',
      'Cross-Site Request Forgery (CSRF) protection',
      'Command injection and OS attacks',
      'Secure coding practices: input validation',
      'Penetration testing basics: reconnaissance',
      'Scanning and enumeration techniques',
      'Vulnerability assessment methodology',
      'Ethical hacking: hands-on practice',
      'Social engineering: phishing and pretexting',
      'Incident response: detection and containment',
      'Forensics basics: evidence collection',
      'Security audits: compliance checking',
      'GDPR and data privacy regulations',
      'HIPAA compliance requirements',
      'Security standards: ISO 27001, NIST',
      'Security certifications overview',
      'Capstone: perform comprehensive security audit',
    ],
    'data-science': [
      'Data science lifecycle and workflows',
      'Data collection: APIs, web scraping, databases',
      'Data quality: identifying issues and gaps',
      'Data cleaning: handling duplicates and missing data',
      'Exploratory Data Analysis: initial insights',
      'Statistical summary: distributions and outliers',
      'Correlation analysis: finding relationships',
      'Data visualization with Matplotlib and Seaborn',
      'Feature engineering: creating new variables',
      'Data normalization and scaling',
      'Categorical encoding: one-hot and label encoding',
      'Handling imbalanced data',
      'Time series analysis: trends and seasonality',
      'Anomaly detection techniques',
      'Regression analysis: predicting continuous values',
      'Classification: binary and multi-class problems',
      'Clustering: K-means, hierarchical clustering',
      'Dimensionality reduction: PCA',
      'Feature selection techniques',
      'Model evaluation: accuracy, precision, recall, F1',
      'Cross-validation and train-test split',
      'Hyperparameter optimization',
      'Ensemble methods: voting and stacking',
      'A/B testing for experiments',
      'Statistical testing: hypothesis testing',
      'Data storytelling: communicating insights',
      'Dashboard creation: Tableau or Power BI',
      'Business intelligence tools basics',
      'SQL for data queries',
      'Working with large datasets',
      'Capstone: end-to-end data science project',
    ],
    'mobile-development': [
      'Mobile app landscape: iOS vs Android',
      'Swift basics: syntax and fundamentals',
      'Xcode setup: iOS development environment',
      'UIKit basics: views and controllers',
      'Auto Layout: responsive iOS design',
      'Navigation controllers and tab bars',
      'Table views and collection views',
      'Kotlin basics: syntax and features',
      'Android Studio setup: environment configuration',
      'Android activities and lifecycle',
      'Fragments: modular UI components',
      'Layouts: RelativeLayout, LinearLayout, ConstraintLayout',
      'RecyclerView: efficient list display',
      'Intents: navigation between screens',
      'Android Services and background tasks',
      'Data persistence: SharedPreferences and SQLite',
      'Room database: modern Android persistence',
      'Networking: HTTP requests and APIs',
      'JSON parsing and data serialization',
      'Image loading and caching',
      'Authentication: Firebase auth integration',
      'Push notifications setup',
      'Location services: GPS and maps',
      'Camera and gallery integration',
      'Sensor integration: accelerometer, gyroscope',
      'Performance optimization: profiling apps',
      'Battery and memory management',
      'Testing: unit and UI testing',
      'App store deployment: iOS and Android',
      'Capstone: publish a functional mobile app',
    ],
    'blockchain': [
      'Blockchain fundamentals: distributed ledger technology',
      'Cryptography: public-key infrastructure basics',
      'Hash functions: SHA-256 and Merkle trees',
      'Bitcoin: history and architecture',
      'Bitcoin transactions: inputs and outputs',
      'Bitcoin mining: proof-of-work consensus',
      'Ethereum introduction: smart contracts',
      'Solidity basics: syntax and data types',
      'Smart contracts: writing and deploying',
      'Gas optimization and contract efficiency',
      'Ethereum transactions and accounts',
      'Proof of Stake vs Proof of Work',
      'Consensus mechanisms: understanding algorithms',
      'Wallets: hot vs cold storage',
      'Private keys and seed phrases management',
      'Token standards: ERC-20 tokens',
      'Creating custom tokens',
      'NFTs: ERC-721 standards',
      'DeFi basics: decentralized finance',
      'Smart contract security: common vulnerabilities',
      'Reentrancy attacks and prevention',
      'Contract auditing and testing',
      'Web3.js: interacting with blockchain',
      'Truffle: Ethereum development framework',
      'Hardhat: advanced development environment',
      'Mainnet vs testnet deployment',
      'Debugging smart contracts',
      'Real-world DApp development',
      'Compliance and regulations',
      'Capstone: deploy and test smart contract',
    ],
    'ui-ux-design': [
      'Design thinking: empathy and ideation',
      'Color theory: hue, saturation, brightness',
      'Color psychology: using colors effectively',
      'Typography: font selection and hierarchy',
      'Whitespace and layout principles',
      'Grid systems and alignment',
      'Visual hierarchy: guiding user attention',
      'User research: interviews and surveys',
      'Creating user personas: target audience',
      'User journeys: mapping user flows',
      'Wireframing: low-fidelity layouts',
      'Prototyping: interactive mockups',
      'Usability testing: gathering feedback',
      'Navigation patterns: optimizing user flow',
      'Accessibility: WCAG guidelines',
      'Mobile-first design approach',
      'Responsive design: multi-device layouts',
      'Design systems: component libraries',
      'Figma basics: design tool fundamentals',
      'Figma prototyping: interactive designs',
      'Design collaboration and handoff',
      'Gestalt principles: perception and grouping',
      'Micro-interactions: subtle animations',
      'Loading states and feedback design',
      'Error states: helpful messages',
      'Dark mode design considerations',
      'Cultural sensitivity in design',
      'A/B testing designs',
      'Analytics: measuring design impact',
      'Capstone: design complete user experience',
    ],
    'big-data': [
      'Big data concepts: volume, velocity, variety',
      'Hadoop ecosystem overview',
      'HDFS: distributed file system concepts',
      'HDFS architecture: NameNode and DataNode',
      'MapReduce: programming model basics',
      'Writing MapReduce jobs',
      'Running and monitoring MapReduce',
      'Apache Spark basics: RDDs and DataFrames',
      'Spark SQL: querying big data',
      'Spark MLlib: machine learning on big data',
      'Data ingestion: Kafka basics',
      'Kafka topics, producers, and consumers',
      'Real-time stream processing',
      'Spark Streaming: real-time data processing',
      'Data pipelines: ETL workflows',
      'Data warehousing concepts',
      'Data lakes: centralized data repository',
      'Apache Hive: SQL on Hadoop',
      'HBase: NoSQL database for big data',
      'Data formats: Parquet, ORC optimization',
      'Data compression techniques',
      'Fault tolerance and data replication',
      'Cluster management: YARN',
      'Performance tuning: optimization techniques',
      'Resource allocation and scheduling',
      'Scalability: adding nodes to cluster',
      'Data backup and recovery',
      'Monitoring big data systems',
      'Cost optimization: resource efficiency',
      'Cloud big data: AWS EMR, Azure HDInsight',
      'Capstone: build and optimize data pipeline',
    ],
    'networking': [
      'Network basics: clients, servers, protocols',
      'OSI model: 7 layers of networking',
      'TCP/IP model: practical networking stack',
      'IP addresses: IPv4 and IPv6',
      'Subnetting: network segmentation',
      'CIDR notation: classless addressing',
      'Routing: routing tables and algorithms',
      'Routers: connecting network segments',
      'DNS: domain name resolution',
      'DHCP: automatic IP assignment',
      'Network protocols: HTTP, HTTPS, FTP',
      'TCP vs UDP: connection types',
      'Ports and well-known ports',
      'Firewalls: packet filtering basics',
      'NAT: network address translation',
      'VPN: virtual private networks',
      'Wireless networking: WiFi standards',
      'Network security: encryption protocols',
      'SSL/TLS: secure communication',
      'VLANs: virtual local area networks',
      'Load balancing: distributing traffic',
      'Proxies: forward and reverse proxies',
      'Content Delivery Networks (CDN)',
      'Network troubleshooting: ping, traceroute',
      'Packet analysis: Wireshark basics',
      'Network monitoring tools',
      'QoS: quality of service',
      'Network optimization: bandwidth management',
      'Cloud networking: hybrid networks',
      'Capstone: design and implement network',
    ],
    'fundamentals': [
      'Database basics: DBMS concepts',
      'SQL fundamentals: SELECT, WHERE, JOIN',
      'Advanced SQL: aggregation and subqueries',
      'Indexing: query optimization',
      'Query performance: EXPLAIN plans',
      'Operating systems basics: processes and threads',
      'Process scheduling: CPU allocation',
      'Memory management: RAM and virtual memory',
      'Concurrency: thread synchronization',
      'Deadlocks: detection and prevention',
      'File systems: storage organization',
      'OSI model: network layers',
      'TCP/IP protocols: essential networking',
      'Network security: firewalls and encryption',
      'Software requirements: gathering specifications',
      'Design patterns: structural patterns',
      'Design patterns: behavioral patterns',
      'Testing: unit, integration, system testing',
      'Test-driven development (TDD)',
      'Version control: Git basics',
      'Branching and merging strategies',
      'Code review best practices',
      'Agile methodology: Scrum and sprints',
      'CI/CD fundamentals',
      'Software architecture: monolithic vs microservices',
      'API design: RESTful principles',
      'Serialization: JSON and XML',
      'Security: authentication and authorization',
      'Data privacy and compliance',
      'Capstone: integrate all fundamentals learning',
    ],
  };

  // Get tasks for the domain
  const taskType = pathType === 'fundamentals' ? 'fundamentals' : domain;
  const allTasks = baseTasksTemplates[taskType] || baseTasksTemplates['web-development'];

  // Generate exactly timelineDays * 4 tasks (4 tasks per day)
  const tasksPerDay = 4;
  const totalTasks = timelineDays * tasksPerDay;
  const dailyTasks = [];
  
  for (let i = 0; i < totalTasks; i++) {
    const taskIdx = i % allTasks.length; // cycle through available tasks
    dailyTasks.push(allTasks[taskIdx]);
  }

  // Group daily tasks into phases based on timeline weeks
  const phases = [];
  const tasksPerPhase = Math.ceil(dailyTasks.length / Math.max(timelineWeeks, 1));
  
  for (let i = 0; i < dailyTasks.length; i += tasksPerPhase) {
    phases.push(dailyTasks.slice(i, i + tasksPerPhase));
  }

  return phases;
};

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pathType = searchParams.get('path') || 'fundamentals';
  const domain = searchParams.get('domain') || '';
  
  const questions = pathType === 'fundamentals' ? fundamentalsQuestions : (domainQuestions[domain] || []);

  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce((acc, question) => {
    return acc + (selected[question.id] === question.answer ? 1 : 0);
  }, 0);

  const handleSubmit = () => {
    const timeline = localStorage.getItem('timeline') || '3 months';
    let timelineWeeks = 12; // default
    let timelineDays = 60; // default
    
    if (timeline.includes('months')) {
      const months = parseInt(timeline);
      timelineWeeks = months * 4; // 4 weeks per month
      timelineDays = months * 30; // ~30 days per month
    } else if (timeline.includes('weeks')) {
      timelineWeeks = parseInt(timeline);
      timelineDays = timelineWeeks * 7;
    }

    const roadmapPlan = generateRoadmap(pathType, domain, timelineWeeks, timelineDays);
    localStorage.setItem('roadmapPlan', JSON.stringify(roadmapPlan));
    localStorage.setItem('currentDay', '1');
    localStorage.setItem('carryForward', JSON.stringify([]));
    localStorage.setItem('completedDays', JSON.stringify([]));
    setSubmitted(true);
  };

  const handleContinue = () => {
    if (pathType === 'fundamentals') {
      navigate('/fundamentals');
    } else {
      navigate(`/roadmap/${domain}`);
    }
  };

  const getDisplayName = () => {
    if (pathType === 'fundamentals') return 'Fundamentals';
    return domain.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Assessment quiz</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Test your {getDisplayName().toLowerCase()} knowledge with a short multiple-choice quiz.</p>
        <div className="mt-8 space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="space-y-4 rounded-3xl border border-slate-300 bg-gradient-to-br from-blue-50 to-teal-50 p-5 dark:border-slate-600 dark:from-slate-700 dark:to-slate-700">
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-50">{question.question}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelected((prev) => ({ ...prev, [question.id]: option }))}
                    className={`rounded-3xl border px-4 py-3 text-left transition font-medium ${
                      selected[question.id] === option
                        ? 'border-teal-400 bg-teal-100 text-teal-900 dark:border-teal-400 dark:bg-slate-700 dark:text-teal-200'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-teal-400 dark:hover:bg-slate-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {!submitted ? (
            <Button onClick={handleSubmit}>Submit quiz</Button>
          ) : (
            <div className="space-y-4 w-full">
              <div className="rounded-3xl bg-teal-100 px-4 py-3 text-sm font-medium text-teal-900 dark:bg-slate-700 dark:text-teal-200">
                Score: {score} / {questions.length} ✓
              </div>
              <p className="text-slate-700 dark:text-slate-300">Your personalized {getDisplayName().toLowerCase()} roadmap has been generated! You'll get daily learning tasks to complete.</p>
              <Button onClick={handleContinue} className="w-full">
                Continue →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
