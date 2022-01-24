import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SetsRepository } from '../database/repository/sets';
import { ProblemsRepository } from '../database/repository/problems';
import { ChoicesRepository } from '../database/repository/choices';
import { CollectionsRepository } from '../database/repository/collections';
import { ISets, IProblems, IChoices } from '../interface/ISets';
import { insertAndDeleteInObject, timestampToLocaleTime } from '../utils/custom';

@Service()
export class SetService {
  constructor(
    @InjectRepository() private setsRepo: SetsRepository,
    @InjectRepository() private problemsRepo: ProblemsRepository,
    @InjectRepository() private choicesRepo: ChoicesRepository,
    @InjectRepository() private collectionRepo: CollectionsRepository
  ) {}

  // 타이틀로 세트 검색
  async searchSet(title: string) {
    return await this.setsRepo.searchByTitle(title);
  }

  async selectSet(setId: number) {
    // 세트 검색
    const set = await this.setsRepo.getSet(setId);
    //console.log(set);
    // 세트 검색에 실패하가나 유효하지 않은 경우
    if (!set || !set['collection']) {
      errorGenerator({ msg: 'no matching set id', statusCode: 400 });
    }

    return {
      setId: setId,
      collectionId: set.collectionId,
      creator: set['collection'].creator ? set['collection'].creator.username : null,
      title: set.title,
      description: set.description,
      problems: set.problem,
    };
  }

  // 세트 생성 => collection 테이블에 추가
  async createSet(set: ISets, creatorId: number) {
    // collection 생성
    set.collectionId = await this.collectionRepo
      .save({ id: null, creatorId })
      .then((collection) => collection.id);

    // 세트 제작
    const madeSet = await this.makeSet(set);

    // 생성 정보 세팅
    return {
      setId: madeSet.id,
      title: madeSet.title,
      createdAt: timestampToLocaleTime(madeSet.createdAt),
    };
  }

  // 세트 수정 => sets 테이블에만 추가
  async modifySet(set: ISets) {
    // collection의 생성 일자 검색
    const collectionCreatedAt = await this.setsRepo.getCollectionCreatedAt(
      set.collectionId
    );
    // collection이 없거나 collection에 해당하는 set가 없을 경우
    if (!collectionCreatedAt) {
      errorGenerator({ msg: 'no matching collection', statusCode: 400 });
    }

    // 세트 제작
    const madeSet = await this.makeSet(set);
    // 수정 정보 세팅
    return {
      setId: madeSet.id,
      title: madeSet.title,
      createdAt: timestampToLocaleTime(collectionCreatedAt),
      upatedAt: timestampToLocaleTime(madeSet.createdAt),
    };
  }

  // 세트 삽입
  async makeSet(set: ISets) {
    // 세트 타이틀이 누락된 경우
    if (!set.title) {
      errorGenerator({ msg: 'empty or invalid set title', statusCode: 400 });
    }

    // 세트 삽입 후 setId 값 저장
    const savedSet = await this.setsRepo.save({
      ...set,
    });

    const problems: IProblems[] = set['problems'];

    // 문제가 배열 형태일 경우에만 저장
    // 문제 없는 세트가 존재하기 때문에 문제 데이터가 없을 경우에도 별도의 에러 없음
    if (Array.isArray(problems)) {
      // 문제 배열에 setId 값 삽입
      const problemsToSave = problems.map((problem) => {
        // 문제의 index나 question 값이 존재하지 않으면 에러
        if (!problem.index || !problem.question) {
          errorGenerator({ msg: 'empty or invalid question', statusCode: 400 });
        }
        // db에 적합한 형태로 problems 변환 => setId 삽입
        problem['setId'] = savedSet.id;
        delete problem['id'];

        const choices = problem['choice'];
        // 보기가 배열 형태일 경우에만 저장
        if (!Array.isArray(choices)) {
          errorGenerator({ msg: 'empty or invalid choices', statusCode: 400 });
        }

        // 보기가 2개 미만인 경우
        if (choices.length < 2) {
          errorGenerator({ msg: 'not enough choices', statusCode: 400 });
        }

        choices.map((choice) => {
          // 보기의 index 값이 존재하지 않으면 에러
          if (!choice.index) {
            errorGenerator({ msg: 'empty or invalid choice index', statusCode: 400 });
          }
          // choices에 problemId 삽입
          delete choice['id'];
        });

        return insertAndDeleteInObject(problem, 'setId', savedSet.id, 'id');
      });

      // 문제 삽입
      const savedProblems = await this.problemsRepo.save(problemsToSave);

      // var choicesToSave = []; // db에 삽입될 형태의 보기 배열
      // // 보기 배열에 problemId 값 삽입
      // savedProblems.forEach((problem) => {
      //   const choices = problem['choice'];
      //   // 보기가 배열 형태일 경우에만 저장
      //   if (Array.isArray(choices)) {
      //     // 문제 배열에 setId 값 삽입 후 모든 보기의 배열을 하나로 병합
      //     choicesToSave = choicesToSave.concat(
      //       choices.map((choice) => {
      //         // 보기의 index 값이 존재하지 않으면 에러
      //         if (!choice.index) {
      //           errorGenerator({ msg: 'empty or invalid choice index', statusCode: 400 });
      //         }
      //         // choices에 problemId 삽입
      //         return insertAndDeleteInObject(choice, 'problemId', problem.id, 'id');
      //       })
      //     );
      //   }
      // });

      // // 보기가 2개 미만인 경우
      // if (choicesToSave.length < 2) {
      //   errorGenerator({ msg: 'not enough choices', statusCode: 400 });
      // }

      //console.log(choicesToSave);
      // 보기 삽입
      //await this.choicesRepo.save(choicesToSave);
    }

    return savedSet;
  }

  async findPopular() {
    return await this.setsRepo.getMostSolvedSet();
  }

  async findVersion(collectionId: number) {
    const sets = await this.setsRepo.getSetByCollectionId(collectionId);
    if (!sets) {
      errorGenerator({ msg: 'no matching versions', statusCode: 400 });
    }
    return sets;
  }

  async findSetsId(userId: number) {
    const find = await this.setsRepo.findMyCollection(userId);
    return find;
  }

  async findSolveSetsId(userId: number) {
    const find = await this.setsRepo.findSolveSet(userId);
    return find;
  }
}
