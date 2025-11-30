'use client'

import { ErrorMessage } from "@/components/ErrorMessage"
import { useEffect } from "react"

interface RootErrorsProps {
    error: Error
}

export default function RootErrors({error}: RootErrorsProps) {
    useEffect(() => {
        console.log(error)
    }, [error])
    
    return (
        <ErrorMessage 
          pageTitle="Internal Server Error" 
          contentTitle="501" 
          content="Ocorreu um erro interno. Tente novamente mais tarde" 
        />
    )
}