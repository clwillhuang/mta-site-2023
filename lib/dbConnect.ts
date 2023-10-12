import mongoose from 'mongoose'
declare global {
  var mongoose: any // This must be a `var` and not a `let / const`
}

const MONGO_URI_DEV = process.env.MONGO_URI_DEV!

if (!MONGO_URI_DEV) {
  throw new Error(
    'Please define the MONGO_URI_DEV environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(MONGO_URI_DEV, opts).then((mongoose) => {
      return mongoose
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
