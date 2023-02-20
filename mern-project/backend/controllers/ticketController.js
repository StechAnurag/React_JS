const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

// @desc    Get All Tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json({ status: 'success', statusCode: 200, message: 'fetched all tickets', data: tickets });
});

// @desc    Get Single Ticket
// @route   GET /api/tickets/:ticketId
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to see someone else's ticket");
  }
  res.status(200).json({ status: 'success', statusCode: 200, message: 'Ticket fetched', data: ticket });
});

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description');
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  });

  res.status(201).json({ status: 'success', statusCode: 201, message: 'Ticket created successfully', data: ticket });
});

// @desc    Delete Ticket
// @route   DELETE /api/tickets/:ticketId
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to see someone else's ticket");
  }

  await ticket.remove();

  res.status(200).json({ status: 'success', statusCode: 200, message: 'Ticket Deleted', data: {} });
});

// @desc    Update a Ticket
// @route   PUT /api/tickets/:ticketId
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  console.log(ticket.user.toString(), req.user.id);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to see someone else's ticket");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.ticketId, req.body, { new: true });

  res.status(200).json({ status: 'success', statusCode: 200, message: 'Ticket Updated', data: updatedTicket });
});

module.exports = { getTickets, createTicket, getTicket, deleteTicket, updateTicket };
