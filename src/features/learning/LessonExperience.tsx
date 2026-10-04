import { useEffect, useId, useState } from 'react';
import { evaluateQuiz, type LessonDocument, type LessonBlock } from './domain';

export default function LessonExperience({ lesson }: { lesson: LessonDocument }) {
  const [ready, setReady] = useState(false);
  const [answers, setAnswers] = useState(() => new Map<LessonBlock['id'], string>());
  const [results, setResults] = useState(() => new Map<LessonBlock['id'], ReturnType<typeof evaluateQuiz>>());
  const domPrefix = useId();
  useEffect(() => setReady(true), []);

  function renderBlock(block: LessonBlock) {
    const headingId = `${domPrefix}-block-${block.id}`;
    switch (block.kind) {
      case 'narrative': return <div className="lesson-prose" dangerouslySetInnerHTML={{ __html: block.html }} />;
      case 'callout': return <aside className="lesson-callout" aria-labelledby={headingId}><h2 id={headingId}>{block.title}</h2><p>{block.body}</p></aside>;
      case 'example': return <section className="lesson-example" aria-labelledby={headingId}><h2 id={headingId}>{block.title}</h2><p>{block.body}</p></section>;
      case 'sources': return <section className="lesson-sources" aria-labelledby={headingId}><h2 id={headingId}>{block.title}</h2><ul>{block.sources.map(source => <li key={source.url}><a href={source.url}>{source.title}</a></li>)}</ul></section>;
      case 'quiz': {
        const { quiz } = block;
        const answer = answers.get(block.id) ?? null;
        const result = results.get(block.id);
        return <form className="lesson-quiz" onSubmit={event => {
          event.preventDefault();
          if (answer !== null) setResults(previous => new Map(previous).set(block.id, evaluateQuiz(quiz, answer)));
        }}>
          <fieldset disabled={!ready}>
            <legend>{quiz.prompt}</legend>
            {quiz.options.map(option => <label key={option.id}><input type="radio" name={block.id} value={option.id} checked={answer === option.id} onChange={() => {
              setAnswers(previous => new Map(previous).set(block.id, option.id));
              setResults(previous => { const next = new Map(previous); next.delete(block.id); return next; });
            }} />{option.label}</label>)}
            <button type="submit" className="button" disabled={answer === null}>Comprobar respuesta</button>
          </fieldset>
          <p className="quiz-feedback" role="status" aria-live="polite">{result?.feedback}</p>
        </form>;
      }
      default: { const exhaustive: never = block; return exhaustive; }
    }
  }
  return <div className="lesson-experience">{lesson.blocks.map(block => <div className="lesson-block" key={block.id}>{renderBlock(block)}</div>)}</div>;
}
