import mongoose,{Schema} from "mongoose";

const SubscriptionTrack = new Schema({

    name: {
        type: String,
        required: [true,"Subscription required"],
        trim:true,
        minLength: 2,
        maxLength: 100
    },
    price:{
        type:Number,
        required:[true,"Subscription plan is required"],
        min:[0,'price must be greater than 0']
    },
    currency:{
        type:String,
        enum:['USD','EUR','GBP'],
        default:'USD'
    },
    frequency:{
        type: String,
        enum:['daily','weekly','monthly','yearly']
    },
    category:{
        type:String,
        enum:['sports','news','Entertainment','lifestyle','finance'],
        required:true
    },
    paymentmethod:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active'
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value)=>value<=new Date(),
            message: 'Start date must be in the past'
        }
    },
    renewalDate:{
        type:Date,
        // required:true,
        validate:{
            validator:function (value) {
                return value > this.startDate;
            },
             message: 'Renewal date must be after the start date'
        }
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }

},{timestamps:true});

SubscriptionTrack.pre("save", function () {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);

        this.renewalDate.setDate(
            this.renewalDate.getDate() + renewalPeriods[this.frequency]
        );
    }

    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }
});


export const Track = mongoose.model("Track",SubscriptionTrack)