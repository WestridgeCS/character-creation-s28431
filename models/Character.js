import mongoose from 'mongoose';

/*
  STEP 1: Define the "shape" of a Character document in MongoDB.
  A schema is like a blueprint: it tells Mongo what fields exist + rules.
*/
const characterSchema = new mongoose.Schema(
  {
    // STEP 2: name is required text
    name: {
      type: String,
      required:true,
      trim:true,
      maxlength:28,
    },

    // STEP 3: type must be one of these options (dropdown-friendly)
    type: {
      type: String,
      required:true,
      trim:true,
      maxlength:28,
      enum: ['druid', 'wizard', 'office worker', 'fighter']
    },

    // STEP 4: trait must be one of these options (dropdown-friendly)
    trait: {
      type: String,
      required:true,
      enum: ['strong', 'weak', 'smart', 'sneaky', 'kind']
    },

    Alignment: {
      type: String,
      required:true,
      enum: ['chaotic good', 'lawful good', 'neutral good','chaotic evil', 'lawful evil', 'neutral evil','chaotic neutral', 'lawful neutral', 'neutral neutral']
    }

  },
  /*
    STEP 5: timestamps automatically adds:
    createdAt and updatedAt to every document
  */
  { timestamps: true }
);

// STEP 6: Create and export the model.
// A model is what we use to talk to the "characters" collection in MongoDB.
export const Character = mongoose.model('Character', characterSchema);
