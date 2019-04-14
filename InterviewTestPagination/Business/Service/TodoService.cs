using System.Collections.Generic;
using InterviewTestPagination.Data;
using InterviewTestPagination.Models;
using InterviewTestPagination.Business.TransactionObjects;

namespace InterviewTestPagination.Business.Service {
    /// <summary>
    /// TODO: Implement methods that enable pagination
    /// </summary>
    public class TodoService : IModelService<Todo> {

        private IModelRepository<Todo> _repository = new TodoRepository();

        public IModelRepository<Todo> Repository {
            get { return _repository; }
            set { _repository = value; }
        }

        /// <summary>
        /// Example implementation of List method: lists all entries of type <see cref="Todo"/>
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Todo> List(/* parameters */) {
            // invoke Datasource layer
            return Repository.All();
        }
    }
}
