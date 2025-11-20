// lib/mockData.js

export const mockCourses = [
  {
    id: 'course-1',
    slug: 'intro-to-rto-compliance-2025',
    title: 'Intro to RTO Compliance (Standards 2025)',
    subtitle: 'Foundation compliance for VET trainers and assessors',
    price: 9900, // cents ($99)
    description:
      'Get a clear overview of the Standards for RTOs 2025 and what they mean for trainers, assessors, and RTO staff in day-to-day practice.',
    thumbnailUrl:
      'https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg', // generic desk/learning image
  },
  {
    id: 'course-2',
    slug: 'assessment-practice-and-validation',
    title: 'Assessment Practice and Validation Essentials',
    subtitle: 'Design, conduct, and validate assessment in line with VET requirements',
    price: 12900, // $129
    description:
      'Practical guidance on assessment tools, rules of evidence, principles of assessment, validation activities, and continuous improvement in an RTO context.',
    thumbnailUrl:
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
  },
];

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
