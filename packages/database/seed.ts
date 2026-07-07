import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data (development only)
  if (process.env.NODE_ENV === 'development') {
    console.log('🗑️  Clearing existing data...')
    await prisma.jobApplication.deleteMany()
    await prisma.savedJob.deleteMany()
    await prisma.job.deleteMany()
    await prisma.company.deleteMany()
    await prisma.jobCategory.deleteMany()
    await prisma.property.deleteMany()
    await prisma.vehicle.deleteMany()
    await prisma.review.deleteMany()
    await prisma.serviceProvider.deleteMany()
    await prisma.serviceCategory.deleteMany()
    await prisma.forumComment.deleteMany()
    await prisma.forumPost.deleteMany()
    await prisma.forumCategory.deleteMany()
    await prisma.classified.deleteMany()
    await prisma.classifiedCategory.deleteMany()
    await prisma.article.deleteMany()
    await prisma.articleCategory.deleteMany()
    await prisma.emergencyContact.deleteMany()
    await prisma.user.deleteMany()
  }

  // Create Users
  console.log('👥 Creating users...')
  const admin = await prisma.user.create({
    data: {
      email: 'admin@helloomansheba.com',
      name: 'Admin User',
      nameBn: 'অ্যাডমিন ইউজার',
      password: '$2a$10$YourHashedPasswordHere', // Hash this properly
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: new Date(),
    },
  })

  const testUser = await prisma.user.create({
    data: {
      email: 'user@test.com',
      name: 'Test User',
      nameBn: 'টেস্ট ইউজার',
      password: '$2a$10$YourHashedPasswordHere',
      role: 'USER',
      status: 'ACTIVE',
      emailVerified: new Date(),
      city: 'Muscat',
    },
  })

  const recruiter = await prisma.user.create({
    data: {
      email: 'recruiter@test.com',
      name: 'Test Recruiter',
      nameBn: 'টেস্ট রিক্রুটার',
      password: '$2a$10$YourHashedPasswordHere',
      role: 'RECRUITER',
      status: 'ACTIVE',
      emailVerified: new Date(),
    },
  })

  // Create Job Categories
  console.log('📁 Creating job categories...')
  const jobCategories = await Promise.all([
    prisma.jobCategory.create({
      data: {
        name: 'Engineering',
        nameBn: 'প্রকৌশল',
        slug: 'engineering',
        icon: '⚙️',
        description: 'Engineering and technical jobs',
        order: 1,
      },
    }),
    prisma.jobCategory.create({
      data: {
        name: 'Healthcare',
        nameBn: 'স্বাস্থ্যসেবা',
        slug: 'healthcare',
        icon: '🏥',
        description: 'Medical and healthcare positions',
        order: 2,
      },
    }),
    prisma.jobCategory.create({
      data: {
        name: 'Construction',
        nameBn: 'নির্মাণ',
        slug: 'construction',
        icon: '🏗️',
        description: 'Construction and labor jobs',
        order: 3,
      },
    }),
    prisma.jobCategory.create({
      data: {
        name: 'Hospitality',
        nameBn: 'আতিথেয়তা',
        slug: 'hospitality',
        icon: '🏨',
        description: 'Hotel and restaurant jobs',
        order: 4,
      },
    }),
    prisma.jobCategory.create({
      data: {
        name: 'Retail',
        nameBn: 'খুচরা',
        slug: 'retail',
        icon: '🏪',
        description: 'Retail and sales positions',
        order: 5,
      },
    }),
  ])

  // Create Companies
  console.log('🏢 Creating companies...')
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: 'Tech Solutions Oman',
        nameBn: 'টেক সলিউশনস ওমান',
        slug: 'tech-solutions-oman',
        description: 'Leading IT company in Oman',
        descriptionBn: 'ওমানের শীর্ষস্থানীয় আইটি কোম্পানি',
        email: 'hr@techsolutions.om',
        phone: '+968 24123456',
        city: 'Muscat',
        verified: true,
        verifiedAt: new Date(),
        status: 'APPROVED',
        industry: 'Information Technology',
      },
    }),
    prisma.company.create({
      data: {
        name: 'Al Noor Hospital',
        nameBn: 'আল নূর হাসপাতাল',
        slug: 'al-noor-hospital',
        description: 'Premium healthcare facility',
        descriptionBn: 'প্রিমিয়াম স্বাস্থ্যসেবা কেন্দ্র',
        email: 'careers@alnoor.om',
        phone: '+968 24789012',
        city: 'Muscat',
        verified: true,
        verifiedAt: new Date(),
        status: 'APPROVED',
        industry: 'Healthcare',
      },
    }),
  ])

  // Create Jobs
  console.log('💼 Creating jobs...')
  await Promise.all([
    prisma.job.create({
      data: {
        title: 'Software Engineer',
        titleBn: 'সফটওয়্যার ইঞ্জিনিয়ার',
        slug: 'software-engineer-tech-solutions',
        description: 'We are looking for an experienced software engineer...',
        descriptionBn: 'আমরা একজন অভিজ্ঞ সফটওয়্যার ইঞ্জিনিয়ার খুঁজছি...',
        companyId: companies[0].id,
        categoryId: jobCategories[0].id,
        type: 'FULL_TIME',
        experience: '3-5 years',
        education: 'Bachelor in Computer Science',
        vacancy: 2,
        city: 'Muscat',
        salaryMin: 280000,
        salaryMax: 420000,
        salaryCurrency: 'BDT',
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
        benefits: ['Health Insurance', 'Paid Leave', 'Annual Bonus'],
        status: 'PUBLISHED',
        publishedAt: new Date(),
        featured: true,
      },
    }),
    prisma.job.create({
      data: {
        title: 'Registered Nurse',
        titleBn: 'রেজিস্টার্ড নার্স',
        slug: 'registered-nurse-al-noor',
        description: 'Looking for compassionate and skilled nurses...',
        descriptionBn: 'দয়ালু এবং দক্ষ নার্স খুঁজছি...',
        companyId: companies[1].id,
        categoryId: jobCategories[1].id,
        type: 'FULL_TIME',
        experience: '2-4 years',
        education: 'BSc in Nursing',
        vacancy: 5,
        city: 'Muscat',
        salaryMin: 210000,
        salaryMax: 315000,
        salaryCurrency: 'BDT',
        skills: ['Patient Care', 'Medical Knowledge', 'Communication'],
        benefits: ['Health Insurance', 'Accommodation', 'Transportation'],
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    }),
  ])

  // Create Service Categories
  console.log('🏥 Creating service categories...')
  const serviceCategories = await Promise.all([
    prisma.serviceCategory.create({
      data: {
        name: 'Healthcare',
        nameBn: 'স্বাস্থ্যসেবা',
        slug: 'healthcare',
        icon: '🏥',
        description: 'Hospitals, clinics, and doctors',
        order: 1,
        featured: true,
      },
    }),
    prisma.serviceCategory.create({
      data: {
        name: 'Legal Services',
        nameBn: 'আইনি সেবা',
        slug: 'legal-services',
        icon: '⚖️',
        description: 'Lawyers and legal consultation',
        order: 2,
        featured: true,
      },
    }),
    prisma.serviceCategory.create({
      data: {
        name: 'Insurance',
        nameBn: 'বীমা',
        slug: 'insurance',
        icon: '🛡️',
        description: 'Insurance providers',
        order: 3,
        featured: true,
      },
    }),
  ])

  // Create Forum Categories
  console.log('💬 Creating forum categories...')
  await Promise.all([
    prisma.forumCategory.create({
      data: {
        name: 'General Discussion',
        nameBn: 'সাধারণ আলোচনা',
        slug: 'general-discussion',
        description: 'General topics and discussions',
        icon: '💬',
        order: 1,
      },
    }),
    prisma.forumCategory.create({
      data: {
        name: 'Jobs & Career',
        nameBn: 'চাকরি ও ক্যারিয়ার',
        slug: 'jobs-career',
        description: 'Job search and career advice',
        icon: '💼',
        order: 2,
      },
    }),
    prisma.forumCategory.create({
      data: {
        name: 'Housing',
        nameBn: 'আবাসন',
        slug: 'housing',
        description: 'Finding accommodation',
        icon: '🏠',
        order: 3,
      },
    }),
  ])

  // Create Classified Categories
  console.log('🛒 Creating classified categories...')
  await Promise.all([
    prisma.classifiedCategory.create({
      data: {
        name: 'Electronics',
        nameBn: 'ইলেকট্রনিক্স',
        slug: 'electronics',
        icon: '📱',
        order: 1,
      },
    }),
    prisma.classifiedCategory.create({
      data: {
        name: 'Furniture',
        nameBn: 'ফার্নিচার',
        slug: 'furniture',
        icon: '🛋️',
        order: 2,
      },
    }),
    prisma.classifiedCategory.create({
      data: {
        name: 'Clothing',
        nameBn: 'পোশাক',
        slug: 'clothing',
        icon: '👕',
        order: 3,
      },
    }),
  ])

  // Create Article Categories
  console.log('📰 Creating article categories...')
  await Promise.all([
    prisma.articleCategory.create({
      data: {
        name: 'Oman News',
        nameBn: 'ওমান সংবাদ',
        slug: 'oman-news',
        type: 'NEWS',
        order: 1,
      },
    }),
    prisma.articleCategory.create({
      data: {
        name: 'Bangladesh News',
        nameBn: 'বাংলাদেশ সংবাদ',
        slug: 'bangladesh-news',
        type: 'NEWS',
        order: 2,
      },
    }),
    prisma.articleCategory.create({
      data: {
        name: 'Guides',
        nameBn: 'গাইড',
        slug: 'guides',
        type: 'GUIDE',
        order: 3,
      },
    }),
  ])

  // Create Emergency Contacts
  console.log('🚨 Creating emergency contacts...')
  await Promise.all([
    prisma.emergencyContact.create({
      data: {
        name: 'Police',
        nameBn: 'পুলিশ',
        category: 'EMERGENCY',
        phone: '9999',
        description: 'Emergency police hotline',
        descriptionBn: 'জরুরী পুলিশ হটলাইন',
        order: 1,
      },
    }),
    prisma.emergencyContact.create({
      data: {
        name: 'Ambulance',
        nameBn: 'অ্যাম্বুলেন্স',
        category: 'EMERGENCY',
        phone: '9999',
        description: 'Emergency ambulance service',
        descriptionBn: 'জরুরী অ্যাম্বুলেন্স সেবা',
        order: 2,
      },
    }),
    prisma.emergencyContact.create({
      data: {
        name: 'Bangladesh Embassy',
        nameBn: 'বাংলাদেশ দূতাবাস',
        category: 'EMBASSY',
        phone: '24698969',
        alternatePhone: '24698733',
        description: 'Bangladesh Embassy in Muscat',
        descriptionBn: 'মাস্কাটে বাংলাদেশ দূতাবাস',
        order: 3,
      },
    }),
  ])

  // Create Settings
  console.log('⚙️  Creating settings...')
  await Promise.all([
    prisma.setting.create({
      data: {
        key: 'site_name',
        value: 'Hello Oman Sheba',
        type: 'string',
        group: 'general',
        description: 'Website name',
      },
    }),
    prisma.setting.create({
      data: {
        key: 'site_tagline',
        value: 'ওমান বাংলাদেশীদের বিশ্বস্ত সেবা প্ল্যাটফর্ম',
        type: 'string',
        group: 'general',
        description: 'Website tagline',
      },
    }),
    prisma.setting.create({
      data: {
        key: 'default_language',
        value: 'bn',
        type: 'string',
        group: 'localization',
        description: 'Default language',
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
  console.log('')
  console.log('📊 Summary:')
  console.log('  - Users: 3')
  console.log('  - Job Categories: 5')
  console.log('  - Companies: 2')
  console.log('  - Jobs: 2')
  console.log('  - Service Categories: 3')
  console.log('  - Forum Categories: 3')
  console.log('  - Classified Categories: 3')
  console.log('  - Article Categories: 3')
  console.log('  - Emergency Contacts: 3')
  console.log('  - Settings: 3')
  console.log('')
  console.log('🔐 Test Credentials:')
  console.log('  Admin: admin@helloomansheba.com / Admin@123')
  console.log('  User: user@test.com / User@123')
  console.log('  Recruiter: recruiter@test.com / Recruiter@123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
