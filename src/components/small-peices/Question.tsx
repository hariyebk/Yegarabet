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
                <h3 className="text-lg text-primary flex flex-wrap leading-6"> {field.question}
                <span className="text-sm text-red-500 ml-2"> * </span>
                </h3>
                {answers.map((answer, index) => {
                    return (
                        <div key={index + 1} className="flex items-center gap-3 mt-6">
                            <Checkbox checked={field.answer === answer} onClick={() => fieldChange({
                                question: field.question,
                                answer: field.answer === answer ? "" : answer
                            })} className="focus-visible:outline-none" />
                            <p> {answer} </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
