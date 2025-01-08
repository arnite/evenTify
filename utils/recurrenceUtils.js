const Event = require('../models/eventModel');

const generateOccurrences = (event, startDate, endDate) => {
  const occurrences = [];
  let currentDate = new Date(event.startDate);

  while (currentDate <= endDate) {
    if (currentDate >= startDate) {
      occurrences.push({
        ...event._doc,
        startDate: new Date(currentDate),
        endDate: new Date(
          currentDate.getTime() + (event.endDate - event.startDate)
        ), // Adjust end date
      });
    }

    // Increment the date based on recurrence rule
    if (event.recurrenceRule === 'daily') {
      currentDate.setDate(currentDate.getDate() + 1);
    } else if (event.recurrenceRule === 'weekly') {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (event.recurrenceRule === 'monthly') {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  return occurrences;
};

exports.fetchEvents = async (startDate, endDate) => {
  try {
    const events = await Event.find({
      $or: [
        { isRecurring: false, startDate: { $gte: startDate, $lte: endDate } },
        { isRecurring: true },
      ],
    });

    const result = [];

    events.forEach((event) => {
      if (event.isRecurring) {
        const occurrences = generateOccurrences(event, startDate, endDate);
        result.push(...occurrences);
      } else {
        result.push(event);
      }
    });

    return result;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
