import AiBehaviorContent from './aiBehaviorContent.enum';

export default interface ChatRequest {
    message: string;
    aiBehaviourContent: AiBehaviorContent;
}
