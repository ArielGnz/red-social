import React, { useState } from 'react'

export const useForm = (initialObj = {}) => {

    const [form, setForm] = useState(initialObj);

    const changed = ({target}) => {
        console.log(target)
    }
  
    return {
        form,
        changed
    }
}
