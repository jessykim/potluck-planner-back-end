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
    const potlucks = await Potluck.find(req.query)
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
    res.status(200).json(potluck)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show
}