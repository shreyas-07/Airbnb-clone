#!/usr/bin/env node
'use strict';

const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../src/utils/password');

// Use default Prisma client which will use DATABASE_URL from environment
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...\n');

  // Test connection first
  try {
    await prisma.$connect();
    console.log('Database connection successful!\n');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('\nPlease check your DATABASE_URL connection string.');
    console.error('For Supabase, ensure you are using the correct direct connection URL.');
    console.error('Get it from: Supabase Dashboard > Settings > Database > Connection string > Direct connection\n');
    process.exit(1);
  }

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('Clearing existing data...');
  try {
    await prisma.travelItinerary.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.propertyAvailability.deleteMany();
  await prisma.propertyPhoto.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.property.deleteMany();
  await prisma.travelerProfile.deleteMany();
  await prisma.ownerProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.pointOfInterest.deleteMany();
  await prisma.localEvent.deleteMany();
    await prisma.restaurant.deleteMany();
    console.log('Existing data cleared.\n');
  } catch (error) {
    console.warn('Warning: Could not clear existing data:', error.message);
    console.log('Continuing with seed...\n');
  }

  // Create Travelers
  console.log('Creating travelers...');
  const traveler1Password = await hashPassword('traveler123');
  const traveler1 = await prisma.user.create({
    data: {
      email: 'alice.traveler@example.com',
      name: 'Alice Johnson',
      passwordHash: traveler1Password,
      role: 'TRAVELER',
      phone: '+1-555-0101',
      travelerProfile: {
        create: {
          about: 'Passionate traveler exploring the world one stay at a time.',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          languages: 'English, Spanish',
          gender: 'Female',
        },
      },
    },
  });

  const traveler2Password = await hashPassword('traveler123');
  const traveler2 = await prisma.user.create({
    data: {
      email: 'bob.traveler@example.com',
      name: 'Bob Smith',
      passwordHash: traveler2Password,
      role: 'TRAVELER',
      phone: '+1-555-0102',
      travelerProfile: {
        create: {
          about: 'Business traveler looking for comfortable stays.',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          languages: 'English',
          gender: 'Male',
        },
      },
    },
  });
  console.log(`Created travelers: ${traveler1.email}, ${traveler2.email}\n`);

  // Create Owners
  console.log('Creating owners...');
  const owner1Password = await hashPassword('owner123');
  const owner1 = await prisma.user.create({
    data: {
      email: 'sarah.owner@example.com',
      name: 'Sarah Williams',
      passwordHash: owner1Password,
      role: 'OWNER',
      phone: '+1-555-0201',
      ownerProfile: {
        create: {
          about: 'Experienced host with multiple properties.',
          location: 'Los Angeles, CA',
          phone: '+1-555-0201',
          company: 'Williams Properties',
        },
      },
    },
  });

  const owner2Password = await hashPassword('owner123');
  const owner2 = await prisma.user.create({
    data: {
      email: 'mike.owner@example.com',
      name: 'Mike Chen',
      passwordHash: owner2Password,
      role: 'OWNER',
      phone: '+1-555-0202',
      ownerProfile: {
        create: {
          about: 'New host excited to share my space.',
          location: 'Seattle, WA',
          phone: '+1-555-0202',
        },
      },
    },
  });
  console.log(`Created owners: ${owner1.email}, ${owner2.email}\n`);

  // Create Properties
  console.log('Creating properties...');
  const property1 = await prisma.property.create({
    data: {
      ownerId: owner1.id,
      title: 'Cozy Downtown Apartment',
      description: 'Beautiful 2-bedroom apartment in the heart of downtown. Perfect for couples or small families.',
      propertyType: 'Apartment',
      addressLine1: '123 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      postalCode: '90001',
      latitude: 34.0522,
      longitude: -118.2437,
      pricePerNight: 150.00,
      cleaningFee: 50.00,
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
      checkInTime: '15:00',
      checkOutTime: '11:00',
      amenities: {
        create: [
          { label: 'WiFi' },
          { label: 'Kitchen' },
          { label: 'Air Conditioning' },
          { label: 'TV' },
          { label: 'Washer/Dryer' },
        ],
      },
      photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
            caption: 'Living room',
            isCover: true,
          },
          {
            url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
            caption: 'Bedroom',
            isCover: false,
          },
        ],
      },
      availabilities: {
        create: [
          {
            startDate: new Date('2025-12-01'),
            endDate: new Date('2025-12-31'),
            isBlocked: false,
          },
        ],
      },
    },
  });

  const property2 = await prisma.property.create({
    data: {
      ownerId: owner1.id,
      title: 'Luxury Beach House',
      description: 'Stunning beachfront property with ocean views. Perfect for a relaxing getaway.',
      propertyType: 'House',
      addressLine1: '456 Ocean Drive',
      addressLine2: 'Unit 2B',
      city: 'Santa Monica',
      state: 'CA',
      country: 'USA',
      postalCode: '90401',
      latitude: 34.0089,
      longitude: -118.4973,
      pricePerNight: 350.00,
      cleaningFee: 100.00,
      bedrooms: 4,
      bathrooms: 3,
      maxGuests: 8,
      checkInTime: '16:00',
      checkOutTime: '10:00',
      amenities: {
        create: [
          { label: 'WiFi' },
          { label: 'Kitchen' },
          { label: 'Air Conditioning' },
          { label: 'TV' },
          { label: 'Washer/Dryer' },
          { label: 'Pool' },
          { label: 'Beach Access' },
          { label: 'Parking' },
        ],
      },
      photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
            caption: 'Beach view',
            isCover: true,
          },
          {
            url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
            caption: 'Pool area',
            isCover: false,
          },
        ],
      },
      availabilities: {
        create: [
          {
            startDate: new Date('2025-12-01'),
            endDate: new Date('2025-12-31'),
            isBlocked: false,
          },
        ],
      },
    },
  });

  const property3 = await prisma.property.create({
    data: {
      ownerId: owner2.id,
      title: 'Modern Studio Loft',
      description: 'Chic studio loft in trendy neighborhood. Great for solo travelers or couples.',
      propertyType: 'Studio',
      addressLine1: '789 Market Street',
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      postalCode: '98101',
      latitude: 47.6062,
      longitude: -122.3321,
      pricePerNight: 120.00,
      cleaningFee: 30.00,
      bedrooms: 0,
      bathrooms: 1,
      maxGuests: 2,
      checkInTime: '15:00',
      checkOutTime: '11:00',
      amenities: {
        create: [
          { label: 'WiFi' },
          { label: 'Kitchen' },
          { label: 'Air Conditioning' },
          { label: 'TV' },
        ],
      },
      photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
            caption: 'Studio space',
            isCover: true,
          },
        ],
      },
      availabilities: {
        create: [
          {
            startDate: new Date('2025-12-01'),
            endDate: new Date('2025-12-31'),
            isBlocked: false,
          },
        ],
      },
    },
  });
  console.log(`Created ${3} properties\n`);

  // Create Bookings
  console.log('Creating bookings...');
  const booking1 = await prisma.booking.create({
    data: {
      travelerId: traveler1.id,
      propertyId: property1.id,
      status: 'ACCEPTED',
      startDate: new Date('2025-12-15'),
      endDate: new Date('2025-12-20'),
      guests: 2,
      totalPrice: 800.00,
      notes: 'Looking forward to our stay!',
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      travelerId: traveler2.id,
      propertyId: property2.id,
      status: 'PENDING',
      startDate: new Date('2025-12-10'),
      endDate: new Date('2025-12-14'),
      guests: 4,
      totalPrice: 1600.00,
    },
  });
  console.log(`Created ${2} bookings\n`);

  // Create Favorites
  console.log('Creating favorites...');
  await prisma.favorite.create({
    data: {
      travelerId: traveler1.id,
      propertyId: property2.id,
    },
  });

  await prisma.favorite.create({
    data: {
      travelerId: traveler2.id,
      propertyId: property1.id,
    },
  });
  console.log(`Created ${2} favorites\n`);

  // Create Points of Interest
  console.log('Creating points of interest...');
  await prisma.pointOfInterest.createMany({
    data: [
      {
        location: 'Los Angeles, CA',
        title: 'Griffith Observatory',
        description: 'Iconic observatory with stunning city views',
        latitude: 34.1184,
        longitude: -118.3004,
        tags: 'sightseeing, astronomy, views',
      },
      {
        location: 'Santa Monica, CA',
        title: 'Santa Monica Pier',
        description: 'Historic pier with amusement park and restaurants',
        latitude: 34.0089,
        longitude: -118.4973,
        tags: 'entertainment, dining, beach',
      },
      {
        location: 'Seattle, WA',
        title: 'Space Needle',
        description: 'Famous observation tower',
        latitude: 47.6205,
        longitude: -122.3493,
        tags: 'sightseeing, views, landmark',
      },
    ],
  });
  console.log(`Created ${3} points of interest\n`);

  // Create Local Events
  console.log('Creating local events...');
  await prisma.localEvent.createMany({
    data: [
      {
        location: 'Los Angeles, CA',
        title: 'Hollywood Farmers Market',
        description: 'Weekly farmers market with local produce',
        startDate: new Date('2025-12-07T08:00:00'),
        endDate: new Date('2025-12-07T13:00:00'),
        tags: 'food, market, local',
        priceTier: 'Free',
      },
      {
        location: 'Seattle, WA',
        title: 'Pike Place Market Tour',
        description: 'Guided tour of famous market',
        startDate: new Date('2025-12-14T10:00:00'),
        endDate: new Date('2025-12-14T12:00:00'),
        tags: 'tour, food, culture',
        priceTier: 'Moderate',
      },
    ],
  });
  console.log(`Created ${2} local events\n`);

  // Create Restaurants
  console.log('Creating restaurants...');
  await prisma.restaurant.createMany({
    data: [
      {
        location: 'Los Angeles, CA',
        name: 'The Ivy',
        description: 'Upscale California cuisine',
        cuisine: 'American',
        dietaryTags: 'vegetarian-options, gluten-free',
        priceTier: 'Expensive',
        address: '113 N Robertson Blvd, Los Angeles, CA 90048',
        latitude: 34.0736,
        longitude: -118.3839,
        phone: '+1-310-274-8303',
      },
      {
        location: 'Seattle, WA',
        name: 'Pike Place Chowder',
        description: 'Famous chowder house',
        cuisine: 'Seafood',
        dietaryTags: 'gluten-free-options',
        priceTier: 'Moderate',
        address: '1530 Post Alley, Seattle, WA 98101',
        latitude: 47.6085,
        longitude: -122.3401,
        phone: '+1-206-267-2537',
      },
    ],
  });
  console.log(`Created ${2} restaurants\n`);

  console.log('✅ Database seed completed successfully!\n');
  console.log('Test accounts created:');
  console.log('  Travelers:');
  console.log(`    ${traveler1.email} / traveler123`);
  console.log(`    ${traveler2.email} / traveler123`);
  console.log('  Owners:');
  console.log(`    ${owner1.email} / owner123`);
  console.log(`    ${owner2.email} / owner123`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

