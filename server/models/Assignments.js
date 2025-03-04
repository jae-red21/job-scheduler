import mongoose from 'mongoose'
import {v4 as uuid} from 'uuid'

const assignmentSchema = new mongoose.Schema({
    id: {type: String, default: uuid},
    taskId: {type: String, ref:'Task' , required: true},
    agentId: {type: String, ref: 'User', required: true},
    assingedAt: {type: Date, default: Date.now},
    completedAt: {type: Date, default: Date.now}
})

const Assignment = mongoose.model('Assingment', assignmentSchema)

export default Assignment