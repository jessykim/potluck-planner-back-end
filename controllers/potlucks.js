import { Potluck } from "../models/potluck.js"
import { Profile } from "../models/profile.js"

const create = async (req, res) => {
  try {
    req.body.host = req.user.profile
    const potluck = await Potluck.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { potlucks: potluck }},
      { new: true }
    )
    potluck.host = profile
    res.status(201).json(potluck)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const potlucks = await Potluck.find({})
      .populate('host')
    res.status(200).json(potlucks)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const potluck = await Potluck.findById(req.params.id)
    .populate('host', 'food', 'items', 'drinks', 'rsvps.guest')
    res.status(200).json(potluck)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const potluck = await Potluck.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('host')
    res.status(200).json(potluck)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deletePotluck = async (req, res) => {
  try {
    const potluck = await Potluck.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.potlucks.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(potluck)
  } catch (error) {
    res.status(500).json(error)
  }
}

const createRsvp = async (req, res) => {
  try {
    req.body.guest = req.user.profile
    const potluck = await Potluck.findById(req.params.id)
    potluck.rsvps.push(req.body)
    await potluck.save()
    res.status(201).json(potluck)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
  update,
  deletePotluck as delete,
  createRsvp
}