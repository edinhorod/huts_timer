// import * as zod from 'zod'

import { FormContainer, MinutesAmountMinutes, TaskInput } from "./styles";
import { useForm, useFormContext } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()
    
    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task"
                list="task-suggestions"
                placeholder='Dê um nome para o seu projeto'
                {...register('task')}
                disabled={!!activeCycle}
            />

            <datalist id="task-suggestions">
                <option value="Projeto 01" />
                <option value="Projeto 02" />
                <option value="Projeto 03" />
            </datalist>

            <label htmlFor="minutesAmount">Durante</label>
            <MinutesAmountMinutes
                type="number"
                id="minutesAmount"
                placeholder='00'
                step={5}
                min={5}
                max={60}
                {...register('minutesAmount', { valueAsNumber: true })}
                disabled={!!activeCycle}
            />

            <span>minutos.</span>
        </FormContainer>
    );
}