import { BookOpen, Calendar } from "lucide-react";
import { Avatar, Progress } from "radix-ui";
import type { IStudentsDetails } from "../../../../../mocks/detailsStudents";
import { getInitialLetter } from "../../../../../utils/getInitialLetters";

interface Props{
    item: IStudentsDetails
}

export function DetailsStudent({item}: Props){
    return(
        <div className="border border-black/10 p-4 rounded-xl">
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-3">
              <Avatar.Root className= "flex items-center justify-center overflow-hidden select-none w-10 h-10 rounded-full bg-[#DBEAFE]">
                <Avatar.Fallback className="w-full h-full flex items-center justify-center text-sm text-[#155DFC]" >
                  {getInitialLetter(item.name)}
                </Avatar.Fallback>
              </Avatar.Root>
             {item.name}
            </div>
            
            <div className="text-end">
              <span className="block text-[#3182BD] text-xl font-bold">
                {item.percentage}%
              </span>
              <span className="block text-[#4A5565]">Média Geral</span>
            </div>
          </div>

          <div className="w-1/2 flex justify-between my-3">
            <div className="flex items-center gap-2 text-[#4A5565]">
              <BookOpen width={16} height={16} color="#2B7FFF"/>
              <span className="inline-block">{item.finishedQuizzes} quizzes realizados</span>
            </div>

            <div className="flex items-center gap-2 text-[#4A5565]">
              <Calendar width={16} height={16} color="#00C950"  />
              <span>Último quiz: {item.lastQuizzDate}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span>Progresso geral</span>

            <Progress.Root
             className="relative h-3 w-full overflow-hidden rounded bg-gray-200"
             value={Number(item.percentage)}>
             <Progress.Indicator
              className="h-full bg-[#3182BD] transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${100 - Number(item.percentage)}%)` }}
             />
            </Progress.Root>
          </div>
        </div>
    )
}