// import type { NextApiRequest, NextApiResponse } from 'next'

import { NextApiRequest, NextApiResponse } from "@/node_modules/next/dist/shared/lib/utils";

function GET(req: NextApiRequest, res: NextApiResponse) {
    
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    GET(req, res)
  } else {
    // Handle any other HTTP method
  }
}