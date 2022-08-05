import mongoose from 'mongoose';

const { Schema } = mongoose;

const bidSchema = new Schema({
	bidPrice: Number,
	creatorId: String,
	creatorName: String,
	creatorPic: String,
	awarded: Boolean,
});

const RFISchema = new Schema({
	question: String,
	response: String,
	creatorId: String,
	creatorPic: String,
});

const projectSchema = new Schema({
	projectImage: {
		type: String,
		required: false,
	},
	name: String,
	description: String,
	userId: String,
	specialties: [String],
	lifeCycle: String,
	bids: [bidSchema],
	rfis: [RFISchema],
});

export default mongoose.model('project', projectSchema);
// module.exports.Project = mongoose.model('project', projectSchema);
