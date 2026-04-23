import React from 'react'
import { getWhatWeOffer } from './data';
import WhatWeOffer from './WhatWeOffer';

const WhatWeOfferWrapper = async() => {
    const result = await getWhatWeOffer();

  return (
    <>
   {(result.success) ? (
    <WhatWeOffer serviceData={result.data} />
   ) : (
    <div className="text-center text-gray-500 py-10">
       {result.message || "Failed to load Services"}
      </div>
   )}
   </>
  )
}

export default WhatWeOfferWrapper
