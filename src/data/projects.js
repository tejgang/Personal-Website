export const projects = [
  {
    id: 1,
    title: 'Brain Tumor Classification',
    emoji: '🧠',
    image: '/images/Side-By-Side-Of-Brain-MRI-Scan-Results.png',
    description:
      'Developed a Convolutional Neural Network model using TensorFlow and Keras to classify brain tumors (glioma, meningioma, pituitary tumor, no tumor) with 95% accuracy on test data, leveraging a dataset of 7,000+ MRI scans. Implemented advanced data preprocessing and augmentation techniques to improve model performance and ensure robust predictions.',
    links: [
      { label: 'View Project', href: '/documents/BrainTumorCNN.pdf' },
      { label: 'GitHub', href: 'https://github.com/tejgang/BrainTumorCNN' },
    ],
  },
  {
    id: 2,
    title: 'NBA Finals Outcome Prediction',
    emoji: '🏀',
    image: '/images/finals.png',
    description:
      'Developed a Random Forest classification model in Python to simulate and predict 2025 NBA Finals outcomes, achieving 62% test accuracy using team-level regular season and playoff metrics. Engineered a Monte Carlo simulation to estimate championship probabilities over a best-of-seven series, predicting a 75.5% chance of the Oklahoma City Thunder winning against the Indiana Pacers.',
    links: [
      { label: 'View Project', href: '/documents/NBA_Finals_Prediction_fv.pdf' },
      { label: 'GitHub', href: 'https://github.com/tejgang/NBA2025ML' },
    ],
  },
]
