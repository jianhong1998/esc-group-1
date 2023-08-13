import classes from './App.module.scss';

import axios from 'axios';
import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react';
import RequestBody from './models/requests/requestBody.model';
import SummarizeResponse from './models/responses/summarizeResponse.model';
import FeatureOption from './models/featureOption.enum';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';

const App: FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [response, setResponse] = useState<string | null>(null);
    const [feature, setFeature] = useState<FeatureOption>(
        FeatureOption.SUMMARIZE
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const inputOnChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (
        event
    ) => {
        setInputValue(event.target.value);
    };

    const submitButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        const SERVICE_URL = 'http://localhost:3001';
        const url = `${SERVICE_URL}/api/${feature}/`;
        const reqBody: RequestBody = {
            message: inputValue,
        };

        setResponse(null);
        setIsLoading(true);

        axios
            .post<SummarizeResponse>(url, reqBody)
            .then(({ data }) => {
                const { message, response, success } = data;

                if (!success) {
                    throw new Error(`Not Success: ${message}`);
                }

                if (typeof response === 'undefined') {
                    throw new Error(
                        `No response is given. Error message: ${message}`
                    );
                }

                setResponse(response.message.content);
                setIsLoading(false);
            })
            .catch((error) => {
                alert(error);
                console.log(error);
                setIsLoading(false);
            });
    };

    const clearButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        setInputValue('');
    };

    const featureSelectorOnChangeHandler: ChangeEventHandler<
        HTMLSelectElement
    > = (event) => {
        setFeature(event.target.value as FeatureOption);
    };

    return (
        <>
            <div className={classes.flexContainer}>
                <div>
                    <div className={classes.buttonContainer}>
                        <select
                            value={feature}
                            onChange={featureSelectorOnChangeHandler}
                        >
                            <option value={FeatureOption.SUMMARIZE}>
                                Summarize
                            </option>
                            <option value={FeatureOption.TRANSLATE}>
                                Translate
                            </option>
                        </select>
                        <LoadingButton
                            onClick={submitButtonOnClickHandler}
                            loading={isLoading}
                            variant='outlined'
                            color='primary'
                        >
                            Submit
                        </LoadingButton>
                        <Button
                            onClick={clearButtonOnClickHandler}
                            variant='outlined'
                            color='warning'
                        >
                            Clear
                        </Button>
                    </div>
                    <div>
                        <textarea
                            placeholder='Please input something you want to summary or translate'
                            onChange={inputOnChangeHandler}
                            value={inputValue}
                            cols={50}
                            rows={40}
                            className={`${classes.textarea} ${classes.box}`}
                        />
                    </div>
                </div>
                <div
                    className={`${classes.box} ${
                        response ? '' : classes.emptyBox
                    }`}
                >
                    {response === null ? (
                        <p></p>
                    ) : (
                        response
                            .split('\n')
                            .map((value, index) => (
                                <p key={`p-${index}`}>{value}</p>
                            ))
                    )}
                </div>
            </div>
        </>
    );
};

export default App;
