'use client'

import { Checkbox } from "../ui/checkbox"

interface Props {
    field: {question: string, answer: string },
    fieldChange: ({question, answer}: {question: string, answer: string}) => void,
    answers: string[]
}

export default function Question({field, fieldChange, answers}: Props) {
    return (
        <section>
            <div className="mt-8">
                <div className="flex flex-wrap items-start gap-2">
                    <h3 className="max-md:text-base md:text-lg text-primary flex flex-wrap leading-7"> {field.question}
                    </h3>
                    <span className="text-sm text-red-500 ml-2"> * </span>
                </div>
                {answers.map((answer, index) => {
                    return (
                        <div key={index + 1} className="flex items-center gap-3 mt-6">
                            <Checkbox checked={field.answer === answer} onClick={() => fieldChange({
                                question: field.question,
                                answer: field.answer === answer ? "" : answer
                            })} className="focus-visible:outline-none focus:border-none focus-visible:ring-0" />
                            <p> {answer} </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
