import { ISession } from '../models/studyPlan';

export const Session = () => {
    const today = new Date();

    const session: ISession[] = []

    let numberOfDate: number = 4

    if (numberOfDate % 2 === 1) numberOfDate -= 1


    for (let i = 1; i <= numberOfDate; i++) {
        const startDate = new Date(today);
        startDate.setDate(today.getDate() + i);

        const endDate = new Date(today);
        endDate.setDate(today.getDate() + i);


        session.push({
            title: `Session ${i}`,
            startDate,
            endDate
        })
    }

    return session
}