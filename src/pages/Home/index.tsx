import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { HomeContainer, StartCountDownButton, StopCountDownButton } from './styles'

// COMPONENTS
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'

export function Home() {
    const { activeCycle, createNewCycle, interruptCycle } = useContext(CyclesContext)

    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1, 'Informe a tarefa'),
        minutesAmount: zod
            .number()
            .min(5, 'O ciclo deve ser de no mínimo 5 minutos')
            .max(60, 'O ciclo deve ser de no máxio 60 minutos')
    })
    
    type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });
    const { handleSubmit, watch, reset } = newCycleForm


    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    const task = watch('task');
    const isSubmitDisabled = !task;
    
    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />

                {
                    activeCycle ?
                        <StopCountDownButton type="button" onClick={interruptCycle}>
                            <HandPalm size={24} />
                            Interromper
                        </StopCountDownButton>
                        :
                        <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                            <Play size={24} />
                            Começar
                        </StartCountDownButton>
                }
            </form>
                
        </HomeContainer>
    )
}