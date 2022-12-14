import { Potluck } from "../models/potluck.js"
import { Profile } from "../models/profile.js"
import { Food } from "../models/food.js"
import { Drink } from "../models/drink.js"
import { Item } from "../models/item.js"

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
      .populate('host')
      .populate({
        path: 'rsvps',
        populate: {
          path: 'guest'
        }
      })
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
    potluck.populate({
      path: 'rsvps',
      populate: {
        path: 'guest'
      }
    })
    await potluck.save()

    const newRsvp = potluck.rsvps[potluck.rsvps.length - 1]

    res.status(201).json(newRsvp)
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateRsvp = async (req, res) => {
  try {
    const potluck = await Potluck.findById(req.params.potluckId)
    const rsvp = potluck.rsvps.id(req.params.rsvpId)
    rsvp.party = req.body.party
    rsvp.notes = req.body.notes
    rsvp.rsvp = req.body.rsvp
    await potluck.save()
    res.status(200).json(rsvp)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteRsvp = async (req, res) => {
  try {
    const potluck = await Potluck.findById(req.params.potluckId)
    potluck.rsvps.remove({ _id: req.params.rsvpId })
    await potluck.save()
    res.status(200).json(potluck)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createFood = async (req, res) => {
  try {
    req.body.provider = req.user.profile
    const food = await Food.create(req.body)
    const potluck = await Potluck.findByIdAndUpdate(
      req.params.id,
      { $push: { foods: food }},
      { new: true }
    )
    food.populate('provider')
    .then(() => {
      res.status(201).json(food)
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const foodIndex = async (req, res) => {
  try {
    const potluck = await Potluck.findById(req.params.id)
      .populate({
        path: 'foods',
        populate: {
          path: 'provider'
        }
      })
    res.status(200).json(potluck.foods)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.foodId,
      req.body,
      { new: true }
    )
    res.status(200).json(food)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.foodId)
    const potluck = await Potluck.findById(req.params.potluckId)
    potluck.foods.remove({ _id: req.params.foodId })
    await potluck.save()
    res.status(200).json(food)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const createDrink = async (req, res) => {
  try {
    req.body.provider = req.user.profile
    const drink = await Drink.create(req.body)
    const potluck = await Potluck.findByIdAndUpdate(
      req.params.id,
      { $push: { drinks: drink }},
      { new: true }
    )
    drink.populate('provider')
    .then(() => {
      res.status(201).json(drink)
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const drinkIndex = async (req, res) => {
  try {
    const potluck = await Potluck.findById(req.params.id)
      .populate({
        path: 'drinks',
        populate: {
          path: 'provider'
        }
      })
    res.status(200).json(potluck.drinks)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const updateDrink = async (req, res) => {
  try {
    const drink = await Drink.findByIdAndUpdate(
      req.params.drinkId,
      req.body,
      { new: true }
    )
    res.status(200).json(drink)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteDrink = async (req, res) => {
  try {
    const drink = await Drink.findByIdAndDelete(req.params.drinkId)
    const potluck = await Potluck.findById(req.params.potluckId)
    potluck.drinks.remove({ _id: req.params.drinkId })
    await potluck.save()
    res.status(200).json(drink)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const createItem = async (req, res) => {
  try {
    req.body.provider = req.user.profile
    const item = await Item.create(req.body)
    const potluck = await Potluck.findByIdAndUpdate(
      req.params.id,
      { $push: { items: item }},
      { new: true }
    )
    item.populate('provider')
    .then(() => {
      res.status(201).json(item)
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const itemIndex = async (req, res) => {
  try {
    const potluck = await Potluck.findById(req.params.id)
      .populate({
        path: 'items',
        populate: {
          path: 'provider'
        }
      })
    res.status(200).json(potluck.items)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.itemId,
      req.body,
      { new: true }
    )
    res.status(200).json(item)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.itemId)
    const potluck = await Potluck.findById(req.params.potluckId)
    potluck.items.remove({ _id: req.params.itemId })
    await potluck.save()
    res.status(200).json(item)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
  update,
  deletePotluck as delete,
  createRsvp,
  updateRsvp,
  deleteRsvp,
  createFood,
  foodIndex,
  updateFood,
  deleteFood,
  createDrink,
  drinkIndex,
  updateDrink,
  deleteDrink,
  createItem,
  itemIndex,
  updateItem,
  deleteItem,
}