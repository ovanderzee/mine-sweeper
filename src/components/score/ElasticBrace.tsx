import './ElasticBrace.css'

const ElasticBrace = () => {

  return (
    <div id="elastic-brace">
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="m 2,8 c 3.3137085,0 6,2.686292 6,6" />
      </svg>

      <svg width="16" height="16" className="bridge" xmlns="http://www.w3.org/2000/svg">
        <rect x="7.4" width="1.2" />
      </svg>

      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M 8,14 C 8,10.686292 10.686292,8 14,8 10.686292,8 8,5.3137085 8,2" />
      </svg>

      <svg width="16" height="16" className="bridge" xmlns="http://www.w3.org/2000/svg">
        <rect x="7.4" width="1.2" />
      </svg>

      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M 8,2 C 8,5.3137085 5.3137085,8 2,8" />
      </svg>
    </div>
  )

}

export default ElasticBrace
