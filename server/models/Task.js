import mongoose from 'mongoose'
import {v4 as uuid} from 'uuid'

const taskSchema = new mongoose.Schema({
    id: {type: String, default: uuid},
    supervisorId: {type: String, ref: 'User', required: true},
    name: {type:String, required: true},
    priority: {type: Number, min:1, max: 5, required: true},
    createdAt: {type: Date, default: Date.now},
    isAssigned: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false}
})

const Task = mongoose.model('Task', taskSchema)

export default Task